import { Glob } from 'bun'
import minimist from 'minimist'
import { resolve } from 'node:path'

// 获取打包命令的参数
const args = minimist(Bun.argv.slice(2))

// 需要打包的项目
const project = args.p

// 如果没有指定打包的项目，默认全部打包
if (!project) {
  // 扫描路径
  const scanPath = resolve(__dirname, `../packages`)
  // 创建一个全局搜索对象，并指定搜索的表达式
  const glob = new Glob(`**/index.ts`)
  // 开始搜索，找到项目名称
  for await (const file of glob.scan(scanPath)) {
    // 拿到项目名称
    const project = file.split(/[\\\/]/)[0]
    // 打包
    await build(project)
  }
} else {
  await build(project)
}

function getBanner(pkg) {
  // 公共头部
  const commonBanner = `
// @name        ${pkg.buildOptions.name.default}
// @author      ${pkg.author}
// @description ${pkg.description}
// @namespace   ${pkg.repository.url}
// @license     ${pkg.license}
// @version     ${pkg.version}`

  // 每个脚本自定义头部
  let payloadBanner = ``
  const spaceLength = pkg.buildOptions.spaces
  const payload = pkg.buildOptions.payload
  if (payload) {
    for (const key in payload) {
      for (const item of payload[key]) {
        payloadBanner += `\n// @${key.padEnd(spaceLength, ' ')}${item}`
      }
    }
  }

  return `// ==UserScript==${commonBanner}${payloadBanner}\n// ==/UserScript==\n;`
}

async function build(projectName) {
  const entry = resolve(__dirname, `../packages/${projectName}/src/index.ts`)
  const pkg = require(`../packages/${projectName}/package.json`)
  const banner = getBanner(pkg)
  // 打包
  await Bun.build({
    entrypoints: [entry],
    outdir: resolve(__dirname, "../dist"),
    target: "browser",
    format: "iife",
    banner,
    naming: `[dir]/${projectName}.user.[ext]`
  }).catch((err) => {
    console.log('打包失败，原因: ', err)
  })
}