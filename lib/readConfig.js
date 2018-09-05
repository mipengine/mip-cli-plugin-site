/**
 * @file 读取项目配置文件 (mip.config.js)
 * @author wangyisheng@baidu.com (wangyisheng)
 */

const fs = require('fs-extra')
const path = require('path')

module.exports = () => {
  let configPath = path.resolve(process.cwd(), 'mip.config.js')
  let config
  if (!fs.pathExistsSync(configPath)) {
    console.log('没有检测到配置文件 mip.config.js，使用默认配置')
    config = {}
  } else {
    config = require(configPath).dev
  }
  config.cliConfigPath = configPath

  return config
}
