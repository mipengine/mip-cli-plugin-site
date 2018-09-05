/**
 * @file 启动站点开发服务器
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const readConfig = require('../../lib/readConfig')
const startDevServer = require('../../lib/startDevServer')

module.exports = {
  cli: {
    config: {
      description: '启动 MIP2 站点开发服务器',
      name: 'mip2 site dev',
      // options: [
      //   ['-f, --force', '强制执行'],
      //   ['-p, --port <value>', '端口号']
      // ],
      help: [
        '',
        '  Examples:',
        '',
        '    # 启动 mip2 站点开发服务器',
        '    $ mip2 site dev'
      ].join('\n')
    },
    main () {
      let config = readConfig()
      startDevServer(config)
    }
  }
}
