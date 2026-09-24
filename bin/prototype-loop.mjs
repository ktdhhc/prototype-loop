#!/usr/bin/env node

import { cp, lstat, mkdir, mkdtemp, rename, rm } from 'node:fs/promises'
import { homedir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const skillName = 'prototype-loop'
const source = fileURLToPath(new URL('..', import.meta.url))

function usage() {
  return `用法：prototype-loop install [--project <目录> | --global]\n\n--project <目录>  安装到 <目录>/.agents/skills/${skillName}（默认当前目录）\n--global          安装到 ~/.agents/skills/${skillName}\n--help            显示帮助\n\n目标目录已存在时不会覆盖。`
}

function destinationFor(args, cwd = process.cwd(), home = homedir()) {
  if (args[0] !== 'install') throw new Error(usage())

  let project = cwd
  let global = false
  for (let index = 1; index < args.length; index += 1) {
    const arg = args[index]
    if (arg === '--global') {
      global = true
    } else if (arg === '--project' && args[index + 1]) {
      project = resolve(args[++index])
    } else {
      throw new Error(`未知参数：${arg}\n${usage()}`)
    }
  }
  if (global && args.includes('--project')) throw new Error('--global 与 --project 不能同时使用')
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
