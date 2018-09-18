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

2. `cd` 到项目根目录

3. `mip2 site dev` 启动初始项目

4. 访问 `http://localhost:8200/weather/shanghai` 查看初始项目的示例页面

5. 访问 `http://localhost:8200/sf` 查看 SF 线下调试环境

## 命令详解

* [mip2 site dev](https://github.com/mipengine/mip-cli-plugin-site/blob/master/doc/dev.js)

## 开发方式

1. 全局安装 mip2-cli： `npm i mip2 -g`

2. git co 本项目

  `git clone https://github.com/mipengine/mip-cli-plugin-site.git`

3. cd 到项目中，`npm link`

  之后运行 `mip2 --help`，如果在最后出现了 `mip2 site` 命令的说明，表示安装成功

4. git co 模板项目 ([https://github.com/mipengine/dev-mip-site](https://github.com/mipengine/dev-mip-site))

  `git clone https://github.com/mipengine/dev-mip-site.git`

5. cd 到模板项目，执行各种命令 （例如 `mip2 site dev` 等等）

## 功能列表 & Checklist

- [x] 初始化项目（这里可能需要一个子命令，如 `mip2 site init`）
- [x] 编译组件 & 提供服务器支持（即可以通过 `/[componentName]/[componentName].js` 访问到，目前 `mip2 dev` 已经实现，但要融合到启动服务器一起，而不是让开发者打两条命令）
- [x] 启动 nodejs 服务器 （可能又是一个子命令 `mip2 site dev`）
  - [x] 允许开发者获取 URL 上的参数
  - [x] 允许开发者发送请求，获取数据
  - [x] 允许开发者编写模板，并使用数据填充模板
  - [x] 最终输出一个包含 `<mip-xxx>` 标签的 HTML 页面（即常规的 MIP 页面）
  - [x] 允许 actions & templates 的热加载
  - [x] 把静态目录 (static) 从 mip-component 目录里面移动到根目录来
  - [x] 允许开发者指定配置项，如端口号 （低）
- [x] 允许开发者在 SF 环境内调试（mip-sf 项目融合其中，可以在 `mip2 site dev` 中添加一条固定的路由）（中）
  - [x] 添加单独的命令 `mip2 sf` 单独启动一个 SF 调试环境（中）
- [ ] 检查开发者是不是在一个合法的 site 项目里面启动命令，避免意料外的奇怪报错 （中）
- [x] 允许开发者在外层目录进行一些组件的快速操作，而不是 `cd` 到目录里面再操作
  - [x] 添加组件 `mip2 site add-component`（中）
  - [x] 打包组件 `mip2 site build-component`（中）
  - [ ] 解决 `mip2 site build-component` 时报出的 site 依赖的 npm 包不在白名单的错误（中）
- [ ] 允许开发者上传到 CDN 上预览效果 （可能是 `mip2 site cdn`）（低）
- [ ] 允许开发者验证自己的组件或者网页是否合法。或者在 `mip2 site dev` 时直接弹出提示，可以通过某配置项禁用提示（低）
