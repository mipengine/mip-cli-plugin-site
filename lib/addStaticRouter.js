/**
 * @file 增加静态目录的路由
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const fs = require('fs-extra')
const path = require('path')
const koaStatic = require('koa-static')

module.exports = server => {
  let staticDir = path.resolve(process.cwd(), 'static')
  if (fs.pathExistsSync(staticDir)) {
    server.router.get('/static/*', koaStatic(process.cwd()))
  }
}
