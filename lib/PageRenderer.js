/**
 * @file 读取开发者本地的 template，并替换变量输出为 string 供 koa 使用
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const path = require('path')

const fs = require('fs-extra')
const chalk = require('chalk')
const template = require('lodash.template')

module.exports = class PageRenderer {
  constructor (options) {
    this.options = options
  }

  render (templatePath, data) {
    if (!templatePath) {
      console.log(chalk.red('Action 的模板路径不能为空。\n'))
      return ''
    }

    // 自动补全相对路径，供开发者简便使用
    // render('weather') => render('templates/weather')
    if (!/^(\.\/)?templates\//.test(templatePath)) {
      templatePath = 'templates/' + templatePath
    }

    // 补全扩展名
    // render('../templates/weather') => render('../templates/weather.tpl')
    if (!/\.tpl$/.test(templatePath)) {
      templatePath += '.tpl'
    }

    let fullPath = path.resolve(process.cwd(), templatePath)
    if (!fs.pathExistsSync(fullPath)) {
      console.log(chalk.red('指定的模板文件不存在：' + fullPath + '\n'))
      return ''
    }

    // TODO 根据 this.options.livereload 判断是否需要 watch 并重新加载 action
    let content = fs.readFileSync(fullPath, 'utf8')
    return template(content)(data)
  }
}
