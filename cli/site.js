/**
 * @file mip2 site 父命令，主要负责提示用法
 * @author wangyisheng@baidu.com (wangyisheng)
 */

module.exports = {
  cli: {
    config: {
      description: 'MIP2 站点集成命令',
      name: 'mip2 site',
      usage: '<command>',
      help: [
        '',
        '  Examples:',
        '',
        '    # 启动 MIP2 新增一个模板组件',
        '    $ mip2 site add-component <component-name>',
        '    # 启动 MIP2 站点开发初始化模板',
        '    $ mip2 site init',
        '    # 启动 MIP2 站点开发服务器',
        '    $ mip2 site dev'
      ].join('\n')
    }
  }
}
