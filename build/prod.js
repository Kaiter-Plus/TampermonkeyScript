import { resolve } from 'node:path'
import minimist from 'minimist'

// 获取打包命令的参数
const args = minimist(Bun.argv.slice(2))

// 需要打包的项目
const project = args._[0]

const entry = resolve(__dirname, `../packages/${project}/src/index.ts`)

const pkg = require(`../packages/${project}/package.json`)

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

const banner = `// ==UserScript==${commonBanner}${payloadBanner}\n// ==/UserScript==\n;`

// 打包
Bun.build({
  entrypoints: [entry],
  outdir: resolve(__dirname, "../dist"),
  target: "browser",
  format: "iife",
  banner,
  naming: `[dir]/${project}.user.[ext]`
}).catch((err) => {
  console.log('打包失败，原因: ', err)
})