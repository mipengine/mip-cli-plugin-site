/**
 * @file 提供 require 全局的 mip2 的机制
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const path = require('path')

const sep = path.sep === '\\' ? '\\\\' : path.sep
// require.main.filename = $HOME/npm/node_modules/mip2/bin/mip2-addPlugin
// 替换后: $HOME/npm/node_modules/mip2
const prefix = require.main.filename.replace(new RegExp(`${sep}bin${sep}mip2-addPlugin`), '')

module.exports = requirePath => require(path.resolve(prefix, requirePath))
