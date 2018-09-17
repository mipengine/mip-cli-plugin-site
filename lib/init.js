/**
 * @file 初始化mip项目命令
 * @author tracy(qiushidev@gmail.com)
 */

const generate = require('./utils/generate')
const download = require('./utils/download')

module.exports = function init () {
  try {
	  download(() => {
	  	generate('mip-site', false, err => {
		  	if (err) {
		        console.error('Failed to generate project: ' + err.message.trim())
		        return
		    }
		    console.info('generate MIP project successfully!')
	  	})
	  })
  }
  catch(e){
  	console.log('err', e)
  }
}