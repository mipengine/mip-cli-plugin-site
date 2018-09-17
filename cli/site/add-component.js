/**
 * @file add-component 添加组件
 * @author liuruoran@baidu.com (lrr)
 */

const addComponent = require('../../lib/addComponent.js')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const requireMIP2 = require('../../lib/requireMIP2')
const cliMIP2 = requireMIP2('lib/cli')

const CONFIG_DATA = {
  usage: '<component-name>',
  description: '添加一个组件模板',
  name: 'mip2 site add-component <component-name>',
  options: [
    ['-f, --force', '是否覆盖']
  ],
  help: [
    '',
    '  Examples:',
    chalk.gray('    # 新增 mip 组件'),
    '    $ mip2 site add-component mip-demo',
    chalk.gray('    # 新增 mip 组件，强制覆盖同名组件'),
    '    $ mip2 site add-component mip-demo -f'
  ].join('\n')
}

const args = cliMIP2.setup(CONFIG_DATA)


module.exports = {
  cli: {
    config: CONFIG_DATA,
    main () {
      if (args[2] && !args[2].match(/^mip-[\w-]+$/)) {
        console.warn('组件名称不规范！请输入形如 mip-xxx 的名称')
        return
      }

      if (!fs.existsSync(path.resolve('mip-component'))) {
        console.warn('请在项目根目录执行 mip2 site add-component 命令')
        return
      }

      addComponent({
        compName: args[2] || 'mip-example',
        options: cliMIP2.program
      })
    }
  }
}
