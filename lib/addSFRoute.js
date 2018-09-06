/**
 * @file 添加 SF 相关路由
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const path = require('path')
const fs = require('fs-extra')
const mime = require('mime')

let FILE_CACHE = Object.create(null)

function serveStatic (filename) {
  return (ctx, next) => {
    ctx.set('Cache-Control', 'max-age=604800')

    if (FILE_CACHE[filename]) {
      ctx.type = FILE_CACHE[filename].type
      ctx.body = FILE_CACHE[filename].content
    } else {
      let content = fs.readFileSync(path.resolve(__dirname, '../sf/', filename), 'utf8')
      let type = mime.getType(filename)
      FILE_CACHE[filename] = {content, type}
      ctx.type = type
      ctx.body = content
    }
  }
}

module.exports = server => {
  server.router.get('/sf/index.js', serveStatic('index.js'))
  server.router.get('/sf/index.css', serveStatic('index.css'))
}
