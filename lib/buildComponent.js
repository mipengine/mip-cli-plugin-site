/**
 * @file       编译组件
 * @author     chenyongle@baidu.com(chenyongle)
 */
const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')
const requireMIP2 = require('./requireMIP2')
const Builder = requireMIP2('lib/builder')

module.exports = async function (options) {
  options.dir = path.resolve(process.cwd(), 'mip-component', options.dir || '')
  options.output = path.resolve(process.cwd(), 'mip-component', options.output || 'dist')
  options.asset = options.asset || '/'
  options.env = options.env || 'production'
  
  process.env.NODE_ENV = options.env

  const builder = new Builder(options)

  try {
    if (options.clean) {
      await fs.remove(options.output)
    }
    await builder.build()

    console.log(chalk.yellow('INFO'), ' 编译成功！')
  } catch (e) {
    console.log(chalk.red('ERROR'), ' 编译失败')
    if (Array.isArray(e)) {
      e.forEach(err => {
      	console.log(chalk.red(err))
      })
    } else {
      console.log(chalk.red(e))
    }

    throw e
  }
}