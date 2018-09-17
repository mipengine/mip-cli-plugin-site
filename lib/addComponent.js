/**
 * @file 初始化mip项目命令
 * @author tracy(qiushidev@gmail.com)
 */

const fs = require('fs')
const path = require('path')
const download = require('./utils/download')
const generate = require('./utils/generate')
const { globPify } = require('./utils/helper')

module.exports = function add (config) {
  try {

  	if (fs.existsSync(path.resolve('mip-component/components', config.compName)) && !config.options.force) {
	    console.warn('组件:' + config.compName + ' 已存在，您可以使用-f 或 --force 参数强制覆盖')
	    return
	  }

	  const componentTpl = 'mip-site/mip-component/components/mip-example'



	  download(() => {
	    generate(componentTpl, config.compName, async err => {
	      if (err) {
	        console.error('Failed to add component: ' + err.message.trim())
	        return
	      }

	      await replaceComponentName()

	      console.info('Add component: ' + config.compName + ' successfully!')
	    })
	  })

	  function replaceComponentName () {
	    return globPify('**/*.*', {
	      cwd: path.resolve('mip-component/components', config.compName),
	      realpath: true
	    })
	      .then(files => {
	        files.forEach(file => {
	          fs.renameSync(file, file.replace(/(\/)mip-example(\.[html|md|vue])/, '$1' + config.compName + '$2'))
	        })
	      })
	  }

  }
  catch(e){
  	console.log('err', e)
  }
}
