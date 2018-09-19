# mip2 site dev

启动 MIP 站点开发服务器，大体来说主要包含 3 个功能：

* 官方的组件开发服务器，即 `mip2 dev`，可以对 MIP 组件进行调试
* SuperFrame 线下调试服务器，即 `mip2 sf`，可以使 MIP 页面在 SF 环境下预览
* 简易 nodejs 服务和模板渲染引擎，可以在拼装 MIP 页面时进行一些稍微复杂的操作

## 使用方法

### 前置条件

1. 全局安装 `npm i mip2 -g`

2. 初始化站点项目 `mip2 site init` [init 文档](https://github.com/mipengine/mip-cli-plugin-site/blob/master/doc/init.md)

3. `cd` 到目录中并使用 `npm i` 安装依赖

### 启动命令

`mip2 site dev`

### 访问地址

原则上访问路径最大限度和官方内置命令的访问路径保持一致，只有端口号不同（因为端口号相同会有冲突）。

以下地址均采用默认端口 8200，如要改动，参见修改配置部分。

* 组件开发方面

  * 预览单个组件（和 `mip2 dev` 相同）：`http://localhost:8200/components/${组件名}/example/${组件名}.html`

    例如初始化的站点项目中默认包含一个名为 `mip-example` 的组件，那么它的预览地址是 `http://localhost:8200/components/mip-example/example/mip-example.html`

  * 组件 JS 地址

### 配置项

因为配置项较多，暂不支持命令行的配置项，采用配置文件的方式，位于根目录的 `mip.config.js`。配置项包括：
