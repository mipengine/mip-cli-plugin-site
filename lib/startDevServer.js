/**
 * @file 启动开发服务器
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const path = require('path')
const opn = require('opn')
const chalk = require('chalk')
const requireMIP2 = require('./requireMIP2')
const ActionLoader = require('./ActionLoader')
const addSFRoute = require('./addSFRoute')

const Server = requireMIP2('lib/server')

module.exports = async options => {
  options.dir = path.resolve(process.cwd(), 'mip-component')
  options.port = options.port || 8200
  options.livereload = options.livereload || false
  options.env = 'development'

  if (options.asset) {
    options.asset = options.asset.replace(/\/$/, '').replace(/:\d+/, '') + ':' + options.port
  } else {
    options.asset = 'http://localhost:' + options.port
  }

  const server = new Server(options)
  const actionLoader = new ActionLoader(options, server)
  await actionLoader.load()

  if (options.enableSF) {
    addSFRoute(server)
  }

  try {
    server.run()

    console.log(`\n服务启动成功，正在监听 http://localhost:${server.port}\n`)
    console.log(chalk.yellow('预览单个组件:'))
    console.log(`http://localhost:${server.port}/components/{组件名}/example/{组件名}.html\n`)
    console.log(chalk.yellow('引用组件JS:'))
    console.log(`http://localhost:${server.port}/{组件名}/{组件名}.js\n`)
    console.log(chalk.yellow('预览整体页面:'))
    console.log(`http://localhost:${server.port}/{自定义路由}\n`)
    if (options.enableSF) {
      console.log(chalk.yellow('预览线下 SF 环境:'))
      console.log(`http://localhost:${server.port}/sf\n\n`)
    }

    let autoopen = options.autoopen

    if (autoopen) {
      if (/^\//.test(autoopen)) {
        autoopen = `http://localhost:${server.port}${autoopen}`
      }

      console.log(`正在打开网页 ${autoopen}`)
      opn(autoopen)
    }
  } catch (e) {
    console.log(chalk.red('服务启动失败'))
    console.log(e)
  }
}
