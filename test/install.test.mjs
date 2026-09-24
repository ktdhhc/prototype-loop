import assert from 'node:assert/strict'
import { mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { install } from '../bin/prototype-loop.mjs'

async function withTempDir(fn) {
  const directory = await mkdtemp(join(tmpdir(), 'prototype-loop-test-'))
  try {
    await fn(directory)
  } finally {
    await rm(directory, { recursive: true, force: true })
  }
}

test('installs only the skill files into a project', async () => {
  await withTempDir(async (project) => {
    const destination = await install(['install'], { cwd: project })
    assert.equal(destination, join(project, '.agents', 'skills', 'prototype-loop'))
    assert.match(await readFile(join(destination, 'SKILL.md'), 'utf8'), /name: prototype-loop/)
    assert.ok((await readdir(join(destination, 'references'))).includes('layers.md'))
    assert.deepEqual((await readdir(destination)).sort(), ['SKILL.md', 'references'])
  })
})

test('does not overwrite an existing skill', async () => {
  await withTempDir(async (project) => {
    const destination = await install(['install'], { cwd: project })
    const skillPath = join(destination, 'SKILL.md')
    await writeFile(skillPath, 'my version')
    await assert.rejects(install(['install'], { cwd: project }), /已存在/)
    assert.equal(await readFile(skillPath, 'utf8'), 'my version')
  })
})

test('supports global installation without touching the real home directory', async () => {
  await withTempDir(async (home) => {
    const destination = await install(['install', '--global'], { home })
    assert.equal(destination, join(home, '.agents', 'skills', 'prototype-loop'))
    assert.match(await readFile(join(destination, 'SKILL.md'), 'utf8'), /name: prototype-loop/)
  })
})

test('rejects conflicting destinations', async () => {
  await assert.rejects(install(['install', '--global', '--project', '.']), /不能同时使用/)
})
