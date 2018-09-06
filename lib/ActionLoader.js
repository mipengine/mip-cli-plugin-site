/**
 * @file 读取所有开发者配置的 actions
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const path = require('path')

const fs = require('fs-extra')
const glob = require('glob')
const chalk = require('chalk')
const chokidar = require('chokidar')

const PageRenderer = require('./PageRenderer')

const VALID_METHOD = ['get', 'post', 'put', 'delete', 'all']

function getActionList(actionDir) {
  return new Promise((resolve, reject) => {
    glob(`${actionDir}/*.js`, (err, files) => {
      if (err) {
        reject(err)
        return
      }

      resolve(files)
    })
  })
}

module.exports = class ActionLoader {
  constructor (options, server) {
    this.options = options
    this.server = server
    this.renderer = new PageRenderer(options)
  }

  async load () {
    // TODO actionDir 可以考虑加到配置项去
    let actionDir = path.resolve(process.cwd(), 'actions')
    if (!fs.pathExistsSync(actionDir)) {
      console.log(chalk.yellow('没有检测到 Actions'))
      console.log('您可以通过向 actions 目录添加文件以激活路由设置，或者直接访问组件预览页面进行单个预览。\n')
      return
    }

    let loadAction = actionPath => {
      let action = require(actionPath)

      if (!action) {
        console.log(chalk.yellow(`您设置的 ${actionPath} 格式非法，已经自动跳过。\n`))
        return
      }

      let {method, pattern, handler} = action

      if (!pattern) {
        console.log(chalk.yellow(`您设置的 ${actionPath} 的 pattern 为空，已经自动跳过。\n`))
        return
      }

      if (typeof handler !== 'function') {
        console.log(chalk.yellow(`您设置的 ${actionPath} 的 handler 不是一个方法，已经自动跳过。\n`))
        return
      }

      if (!method || typeof method !== 'string' || VALID_METHOD.indexOf(method.toLowerCase()) === -1) {
        console.log(chalk.yellow(`您设置的 ${actionPath} 的 method 非法，已经自动设置为 'GET'。\n`))
        method = 'get'
      } else {
        method = action.method.toLowerCase()
      }

      if (this.options.livereload) {
        this.server.router[method](
          pattern,
          async (ctx, next) => {
            try {
              await require(actionPath).handler(ctx, this.renderer.render.bind(this.renderer))
            } catch (e) {
              ctx.status = 404
              ctx.body = '您访问的 Action 可能已被删除'
            }
          }
        )

        let watcher = chokidar.watch(actionPath)
        watcher.on('change', filePath => {
          console.log(chalk.green(`更新 Action：${filePath}`));
          let normalizedPath = path.normalize(filePath)
          require.cache[normalizedPath] = null;
        })
        watcher.on('unlink', path => {
          console.log(chalk.yellow(`删除 Action：${filePath}`))
        })
      } else {
        this.server.router[method](
          pattern,
          async (ctx, next) => handler(ctx, this.renderer.render.bind(this.renderer))
        )
      }

      console.log(chalk.green(`加载 Action：${actionPath}`))
    }

    let actionPaths = await getActionList(actionDir)
    actionPaths.forEach(actionPath => loadAction(actionPath))
  }
}
