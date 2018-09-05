/**
 * @file 启动开发服务器
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const path = require('path')
const opn = require('opn')
const chalk = require('chalk')
const requireMIP2 = require('./requireMIP2')
const ActionLoader = require('./ActionLoader')

const Server = requireMIP2('lib/server')

module.exports = async options => {
  options.dir = path.resolve(process.cwd(), 'mip-component')
  options.port = options.port || 8200
  options.livereload = options.livereload || false
  options.env = 'development'

  if (options.asset) {
    options.asset = options.asset.replace(/\/$/, '').replace(/:\d+/, '') + ':' + options.port
  } else {
    options.asset = 'http://127.0.0.1:' + options.port
  }

  const server = new Server(options)
  const actionLoader = new ActionLoader(options, server)
  await actionLoader.load()

  try {
    server.run()

    console.log(`\n服务启动成功，正在监听 http://127.0.0.1:${server.port}\n`)
    // console.log(chalk.yellow('预览页面:'))
    // console.log(`/example 目录下的 html 可以通过 http://127.0.0.1:${server.port}/example/{页面名}.html 进行预览。`)
    // console.log()
    console.log(chalk.yellow('预览组件页面:'))
    console.log(`http://127.0.0.1:${server.port}/components/{组件名}/example/{页面名}.html\n`)
    console.log(chalk.yellow('引用组件JS:'))
    console.log(`http://127.0.0.1:${server.port}/{组件名}/{组件名}.js\n\n`)

    let autoopen = options.autoopen

    if (autoopen) {
      if (/^\//.test(autoopen)) {
        autoopen = `http://127.0.0.1:${server.port}${autoopen}`
      }

      console.log(`正在打开网页 ${autoopen}`)
      opn(autoopen)
    }
  } catch (e) {
    console.log(chalk.red('服务启动失败'))
    console.log(e)
  }
}