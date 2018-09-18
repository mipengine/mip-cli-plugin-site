/**
 * @file download mip-plugin-site-template by bos url
 * @author lrr
 */

const path = require('path')
const ora = require('ora')
const home = require('user-home')
const rm = require('rimraf').sync
const request = require('request')
const fs = require('fs')
const unzip = require('unzip')

// 下载地址
const ZIP_URL  = 'https://bos.nj.bpc.baidu.com/assets/mip/templates/mip-plugin-site-template.zip'
const ZIP_NAME = 'mip-site.zip'
// 本地临时目录
const tmp = path.join(home, '.mip-plugin-site-template')
const zipPath = path.join(tmp, ZIP_NAME)
const zipOutPath = path.join(tmp, 'mip-site')

module.exports = done => { 
  const spinner = ora('正在获取最新模板')
  spinner.start()

  // 先清空临时目录
  if (fs.existsSync(zipPath)) {
    // rm(zipPath)
    // rm(zipOutPath)
  }
  else {
    fs.mkdirSync(tmp)
    fs.mkdirSync(zipOutPath)
  }

  // 下载文件 & 解压
  downloadFile(ZIP_URL, ZIP_NAME, () => {
      spinner.stop()
      // console.log(ZIP_NAME + '下载完毕')

      // 判断压缩文件是否存在
      if(!fs.existsSync(zipPath))  return

      // 创建解压缩对象
      // 
      let unzip_extract = unzip.Extract({path:zipOutPath})
      // 监听解压缩、传输数据过程中的错误回调
      unzip_extract.on('error', err => {
        console.log('error unzip:', err)
      })
      // 监听解压缩、传输数据结束
      unzip_extract.on('finish', () => {
        // 本以为执行到这里，解压文件已经在输出的路径里了，然而并没有
        // 所以这里可能只是解压完成，还未输出到指定目录
        // console.log(ZIP_NAME + '解压完毕')
      })

      fs.createReadStream(zipPath).pipe(unzip_extract).on('close', () => {
        // console.log('解压文件存在')
        done()
      })

  })

  /**
   * [downloadFile description]
   * @param  {[type]}   uri      网络文件地址
   * @param  {[type]}   filename 文件名
   * @param  {Function} callback 回调函数
   * @return {[type]}   undefined
   */
  function downloadFile(uri, filename, callback){
    var stream = fs.createWriteStream(zipPath)
    request(uri).pipe(stream).on('close', callback) 
  }
}
