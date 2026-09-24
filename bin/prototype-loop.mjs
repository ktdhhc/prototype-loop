#!/usr/bin/env node

import { cp, lstat, mkdir, mkdtemp, rename, rm } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const skillName = 'prototype-loop'
const source = fileURLToPath(new URL('..', import.meta.url))

function usage() {
  return `用法：prototype-loop [install] [选项]

不写 install 时默认安装到当前项目的 .agents/skills/${skillName}。

选项：
  --project <目录>  安装到 <目录>/.agents/skills/${skillName}（默认当前目录）
  --dir <目录>      --project 的别名
  --global, -g      安装到 ~/.agents/skills/${skillName}
  --help, -h        显示帮助

目标目录已存在时不会覆盖。`
}

function destinationFor(args, cwd = process.cwd(), home = homedir()) {
  const options = args[0] === 'install' ? args.slice(1) : args
  let project = cwd
  let global = false
  let projectGiven = false

  for (let index = 0; index < options.length; index += 1) {
    const arg = options[index]
    if (arg === '--global' || arg === '-g') {
      global = true
    } else if (arg === '--project' || arg === '--dir') {
      const value = options[index + 1]
      if (!value || value.startsWith('-')) throw new Error(`缺少参数值：${arg}\n${usage()}`)
      project = resolve(options[++index])
      projectGiven = true
    } else {
      throw new Error(`未知参数：${arg}\n${usage()}`)
    }
  }
  if (global && projectGiven) throw new Error('--global 与 --project 不能同时使用')
  return join(global ? home : project, '.agents', 'skills', skillName)
}

export async function install(args, options = {}) {
  const destination = destinationFor(args, options.cwd, options.home)
  const parent = dirname(destination)
  await mkdir(parent, { recursive: true })
  try {
    await lstat(destination)
    throw new Error(`已存在：${destination}\n为保护原有技能，未覆盖。`)
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
  const staging = await mkdtemp(join(parent, `.${skillName}-`))
  try {
    await cp(join(source, 'SKILL.md'), join(staging, 'SKILL.md'))
    await cp(join(source, 'references'), join(staging, 'references'), { recursive: true })
    await rename(staging, destination)
  } catch (error) {
    if (error.code === 'EEXIST' || error.code === 'ENOTEMPTY') {
      throw new Error(`已存在：${destination}\n为保护原有技能，未覆盖。`)
    }
    throw error
  } finally {
    await rm(staging, { recursive: true, force: true })
  }
  return destination
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(usage())
  } else {
    install(process.argv.slice(2))
      .then((destination) => console.log(`已安装 ${skillName}：${destination}`))
      .catch((error) => {
        console.error(error.message)
        process.exitCode = 1
      })
  }
}
