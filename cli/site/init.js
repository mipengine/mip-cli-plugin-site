/**
 * @file init 羡慕模板
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const init = require('../../lib/init')

module.exports = {
  cli: {
    config: {
      description: '初始化站点',
      name: 'mip2 site init',
      // options: [
      //   ['-f, --force', '强制执行'],
      //   ['-p, --port <value>', '端口号']
      // ],
      help: [
        '',
        '  Examples:',
        '',
        '    # 启动 mip2 开发模板',
        '    $ mip2 site init'
      ].join('\n')
    },
    main () {
      init()
    }
  }
}
