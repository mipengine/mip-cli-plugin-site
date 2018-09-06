/**
 * @file 添加 SF 相关路由
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const path = require('path')
const fs = require('fs-extra')
const mime = require('mime')
const chalk = require('chalk')

let STATIC_CACHE = Object.create(null)
let INDEX_CACHE

function serveStatic (filename) {
  return (ctx, next) => {
    ctx.set('Cache-Control', 'max-age=604800')

    if (STATIC_CACHE[filename]) {
      ctx.type = STATIC_CACHE[filename].type
      ctx.body = STATIC_CACHE[filename].content
    } else {
      let content = fs.readFileSync(path.resolve(__dirname, '../sf/', filename), 'utf8')
      let type = mime.getType(filename)
      STATIC_CACHE[filename] = {content, type}
      ctx.type = type
      ctx.body = content
    }
  }
}

module.exports = server => {
  server.router
    .get('/sf/index.js', serveStatic('index.js'))
    .get('/sf/index.css', serveStatic('index.css'))
    .get(['/wishwing*', '/sf'], (ctx, next) => {
      if (INDEX_CACHE) {
        ctx.body = INDEX_CACHE
      } else {
        let content = fs.readFileSync(path.resolve(__dirname, '../sf/index.html'), 'utf8')
        ctx.body = INDEX_CACHE = content
      }
    })

  console.log(chalk.green('线下 SF 环境设置完成'))
}
