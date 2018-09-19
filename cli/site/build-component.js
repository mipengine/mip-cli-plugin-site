/**
 * @file       编译组件命令
 * @author     chenyongle@baidu.com(chenyongle)
 */
const readConfig = require('../../lib/readConfig')
const buildComponent = require('../../lib/buildComponent')
const requireMIP2 = require('../../lib/requireMIP2')
const cliMIP2 = requireMIP2('lib/cli')
const {objectSubset} = require('../../lib/utils/helper')
const validator = require('mip-component-validator')
const checkRootPath = require('../../lib/checkRootPath')

const CONFIG = {
  description: '编译 MIP2 组件',
  name: 'mip2 site build-component',
  noArgs: true,
  options: [
    ['-a, --asset <value>', '静态资源 publicPath'],
    ['-d, --dir <value>', '组件文件夹路径'],
    ['-o, --output <value>', '编译代码输出路径'],
    ['-c, --clean', '构建前先清空输出目录'],
    /* eslint disable */
    ['-i, --ignore [value]', '忽略沙盒注入或校验，可选参数为 -i sandbox, -i whitelist, -i sandbox,whitelist; -i 默认为 -i sandbox, -i all 默认为 -i sandbox,whitelist'],
    /* eslint enable */
    ['-e, --env <value>', 'NODE_ENV 环境变量，默认为 "production"', 'production']
  ],
  help: [
    '',
    '  Examples:',
    cliMIP2.chalk.gray('    # 编译'),
    '    $ mip2 site build-component'
  ].join('\n')
}

module.exports = {
  cli: {
    config: CONFIG,
    main () {
      checkRootPath()
      let config = readConfig()

      const conf = Object.assign(
        config.build || {},
        // FIX ME
        objectSubset(cliMIP2.program, ['asset', 'dir', 'output', 'clean', 'ignore', 'env'])
      )

      if (conf.ignore === true) {
        conf.ignore = 'sandbox'
      } else if (conf.ignore === 'all') {
        conf.ignore = 'sandbox,whitelist'
      }

      if (conf.ignore && /(^|,)whitelist(,|$)/.test(conf.ignore)) {
        buildComponent(conf)
      } else {
        validator.whitelist(conf.dir).then(reporter => {
          if (reporter.errors.length) {
            cliMIP2.error(reporter.errors[0].message)
            console.warn('上述的非白名单 npm 列表包含了站点和组件全部使用的 npm packages，如果某些 package 仅仅只是站点使用请忽略。')
            // 先把白名单校验过程改成非中断式的
            // process.exit(1)
          }
        })
        .then(() => buildComponent(conf))
      }
    }
  }
}
