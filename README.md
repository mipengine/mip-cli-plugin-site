对应命令 `mip2 site`，帮助开发者把开发插件和开发页面两部分融合，获取更好的开发体验。

## 为什么需要 mip2 site？

一般开发 MIP 页面需要两个部分：

* 开发 MIP 组件
  根据每个站点各自的业务需求，站长需要开发包含自身业务的 MIP 组件。

  例如某个博客站点可能需要开发一个组件 `<mip-blog-list>`，这个组件根据当前 URL 上的 ID 获取用户信息，从而展示他发过的博客的列表。

* 开发 MIP 页面
  根据已有的 MIP 组件（可能是内置组件，也可能是刚才自己开发的自定义组件）拼装成一个 HTML 页面。

开发组件时我们大多使用 MIP CLI 内置的 `mip2 dev` 启动服务器。其他还有例如 `mip2 add`, `mip2 build` 之类的专门针对组件开发的快捷方式。

但开发 MIP1 页面目前并没有单独的工具，更多的是在开发组件的项目中，随便找一个 example，把拼装各个组件的最终页面写进去，之后预览效果。这就相当于 __在单测脚本中写集成测试用例__，是一种失配的现象。

此外，作为一个 MIP 页面，还应当考虑到搜索环境的 SuperFrame （简称 SF） 中显示是否正常。虽然我们额外提供了 `mip2 sf` 命令帮助本地调试，但 __需要同时打开两个 bash 并分别启动 `mip2 dev` 和 `mip2 sf` 也是反人类的__。

`mip2 site` 基于这些实际开发中的问题，主要解决了以下几个问题：

1. 将开发组件和开发页面融合到同一个项目中，我们称为 “MIP 站点项目”

2. 内置 SF 调试环境，不必额外启动命令

3. 保留 `mip2` 本身的全部功能，例如 `mip2 add`, `mip2 build` 等均有快捷命令一一对应，无需反复切换目录。

## 快速开始

作为 MIP CLI 的插件，首先要求开发者全局安装最新版本的 mip2。如果没有，请运行 `npm i mip2 -g` 进行全局安装。

1. `mip2 site init` 初始化项目

2. `cd` 到项目根目录并执行 `npm i`

3. `mip2 site dev` 启动初始项目

4. 访问 `http://localhost:8200/weather/shanghai` 查看初始项目的示例页面

5. 访问 `http://localhost:8200/sf` 查看 SF 线下调试环境

## 命令详解

* [mip2 site init](https://github.com/mipengine/mip-cli-plugin-site/blob/master/doc/init.md)
* [mip2 site dev](https://github.com/mipengine/mip-cli-plugin-site/blob/master/doc/dev.md)
* [mip2 site add-component](https://github.com/mipengine/mip-cli-plugin-site/blob/master/doc/add-component.md)
* [mip2 site build-component](https://github.com/mipengine/mip-cli-plugin-site/blob/master/doc/build-component.md)
