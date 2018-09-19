/**
 * @file       检查项目是否为合法的 site 项目
 * @author     chenyongle@baidu.com(chenyongle)
 */

const path = require('path')
const fs = require('fs')
const chalk = require('chalk')

module.exports = () => {
	let packageJsonPath = path.resolve(process.cwd(), 'package.json')
	let packageJson = {}
	if (!fs.existsSync(packageJsonPath)) {
	  console.log(chalk.red('请在合法的 site 项目或项目根目录中执行此命令。'))
	  process.exit(1)
	}

	packageJson = require(packageJsonPath)

	if (!packageJson.mipSite) {
	  console.log(chalk.red('请在合法的 site 项目或项目根目录中执行此命令。'))
	  process.exit(1)	
	}
}