/**
 * @file       编译组件命令
 * @author     chenyongle@baidu.com(chenyongle)
 */
const readConfig = require('../../lib/readConfig')
const buildComponent = require('../../lib/buildComponent')
const checkRootPath = require('../../lib/checkRootPath')

module.exports = {
  cli: {
    config: {
      description: '编译 MIP2 组件',
      name: 'mip2 site build-component',
      help: [
        '',
        '  Examples:',
        '',
        '    # 编译 MIP2 组件',
        '    $ mip2 site build-component'
      ].join('\n')
    },
    main () {
      checkRootPath()
      let config = readConfig()
      buildComponent(config)
    }
  }
}
