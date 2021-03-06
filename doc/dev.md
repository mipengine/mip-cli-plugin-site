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

* 预览单个组件（和 `mip2 dev` 相同）：`http://localhost:8200/components/${组件名}/example/${组件名}.html`

    例如初始化的站点项目中默认包含一个名为 `mip-example` 的组件，那么它的预览地址是 `http://localhost:8200/components/mip-example/example/mip-example.html`

* 组件 JS 地址（和 `mip2 dev` 相同）：`http://localhost:8200/components/${组件名}/${组件名}.js`

    可以在各处 HTML 文件中引用，例如组件单测的 HTML，或者是最终拼装而成的集成测试页面。

* 预览整体页面：`http://localhost:8200/${自定义路由}`

    开发者可以运用一些简单的逻辑（发送请求获取数据，用数据和组件拼装模板）来自定义集成测试页面，把 MIP 组件拼装到一起组成 MIP 页面，而不再需要在某个组件的 example HTML 内进行这个工作，彻底摆脱“利用单测环境进行集成测试”的现状。

    这一部分会在文档后面的“拼接 MIP 页面”进行更详细的阐述。

* SF 线下调试环境（和 `mip2 sf` 相同）：`http://localhost:8200/sf`

    启动 SF 线下调试环境。更多的细节可以查阅 [mip-cli-plugin-sf](https://github.com/mipengine/mip-cli-plugin-sf)。

### 配置项

因为配置项较多，暂不支持命令行的配置项，采用配置文件的方式，位于根目录的 `mip.config.js`。配置项主要包括几个部分：

1. 组件开发服务器部分，和 `mip dev` 命令的参数一致，因此也可以参考 [mip cli 文档的 dev 部分](https://github.com/mipengine/mip2/blob/dev/docs/guide/mip-cli/cli-usage.md#mip2-dev-%E5%90%AF%E5%8A%A8%E8%B0%83%E8%AF%95%E6%9C%8D%E5%8A%A1%E5%99%A8)

  | 配置项  | 类型 | 默认值 | 说明 |
  | --- | --- | --- | --- |
  | port  | __number__  | `8200` | 服务器启动端口号 |
  | livereload  | __boolean__  | `true` | 是否开启热加载 |
  | autoopen  | __string\|boolean__  | `false` | 服务器启动成功后是否自动打开页面 |
  | ignore  | __string__  | `'sandbox,whitelist'` | 是否忽略沙盒注入或校验 |
  | asset  | __string__  | `''` | 静态资源 publicPath |

2. SF 线下调试环境部分，包含

  | 配置项  | 类型 | 默认值 | 说明 |
  | --- | --- | --- | --- |
  | enableSF  | __boolean__  | `true` | 是否开启线下 SF 调试环境 |

配置文件以 JSON 的格式存在，详情可以参考 `mip2 site init` 项目中的 `mip.config.js`，或者[在线版本](https://github.com/mipengine/mip-plugin-site-template/blob/master/mip.config.js)

## 拼接 MIP 页面

这一部分将重点讲述 `mip2 site dev` 新增的功能：自定义路由和模板拼装。它可以用来帮助开发者使用一些简单的逻辑拼接出一个完整的 MIP 页面从而进行集成测试。

这里主要有两部分需要开发者关注：

1. `actions` 目录，里面存放路由的配置及其处理函数。每个文件输出一个对象，包含一些固定的 key，由 `mip2 site dev` 全部加载并添加到路由规则中。

2. `templates` 目录，里面存放 `actions` 中每个处理函数可能会用到的模板文件。

`mip2 site init` 初始化的项目或者 [mip-plugin-site-template](https://github.com/mipengine/mip-plugin-site-template) 中存放着一个已经配置好的例子，我们可以参考它的写法。

### Action

Action 本质是一个 JS 文件，使用 `module.exports` 暴露一个对象，位于 `actions` 目录。这个对象 __必须__ 包含以下这些内容：

* method

    类型：__string__，可选值：`'get'`, `'post'`, `'put'`, `'del'`, `'all'`。默认 `'get'`。

    配置当前的 Action 支持的 HTTP 协议方法。`'all'` 表示全部支持。

* pattern

    类型：__string__，__必填，没有默认值。__

    配置当前的 Action 支持的路由规则，内部使用 `path-to-regexp` 进行匹配，支持具名的动态参数，例如 `/weather/:city` 则能够匹配例如 `/weather/shanghai`, `/weather/london` 这些 URL。

* handler

    类型：__function__，__必填，没有默认值。__

    配置当前的 Action 在匹配了路由规则后对应的处理函数。

    可以接受两个参数 `handler (ctx, render) {...}`，支持 async/await，即 `async handler (ctx, render) {...}`。

    第一个参数 `ctx` 是 koa 内部的上下文对象，可以通过它获取很多请求相关的内容，例如通过 `ctx.params` 获取路由规则中的动态参数（例如上面例子中的 `city`），通过 `ctx.query` 获取 query 参数等等。此外最终的输出也可以通过设置 `ctx.body = ...` 来进行。更多用法可以参考 koa 的文档。

    第二个参数 `render` 是一个方法，用来使用模板文件 (tpl) 和数据渲染 HTML 页面，并通过 `ctx.body = ` 进行输出。如果您不想使用 `render` 方法，也可以直接使用字符串或者其他方法来输出，这是可选的。`render` 方法接受两个参数，第一个是模板文件的名字，第二个是数据。例如 `ctx.body = render('tplName', {data})`。模板 (包含 MIP 组件) + 数据 = HTML。

    在 `handler` 里面通常还可能需要发送请求。在初始的代码中我们默认使用了轻量级的请求工具 [got](https://github.com/sindresorhus/got)，并获取雅虎天气的数据。开发者可以自由选择其他发送请求的工具，例如 request, 或者内置的 http 和 https 模块。

### Template

Template 是用来生成 HTML 的模板文件，是一个 __可选__ 的辅助工具，为的是帮助开发者更轻松地输出 HTML。再次重申，开发者可以选择不使用 Template。

使用 Template 的方式刚才在 Action 的 `handler` 的部分已经说过: `ctx.body = render('tplName', {data})`，这里主要集中于模板文件本身的写法。

Template 本质是 `.tpl` 结尾的模板文件，采用 HTML 语法。内部使用 `lodash.template` 进行模板替换，因此在插入变量时使用 `<%= ... %>` 这样的语法。

除了插入变量，其余部分和开发一个普通的 MIP 页面是相同的，都包含以下几个部分：

1. 必须是一个完整的 HTML 页面，即有 `<html>`, `<head>`, `<body>` 三个部分。并且必须有 `<html mip>` 进行标识。其余一切的整页规则都和 MIP 是一样的。

2. 可以自由使用 MIP 组件，尤其是项目中尚在开发状态的组件（其实也是最本质的功能）。使用时不要忘记在最后引用组件 JS，例如 `<script src="/mip-example/mip-example.js"></script>`

3. 在组件 JS 之前引用 MIP 核心 JS，即 `<script src="https://c.mipcdn.com/static/v2/mip.js"></script>`

### 示例 & 流程

[mip-plugin-site-template](https://github.com/mipengine/mip-plugin-site-template) 是一个完整的例子。我们可以重点关注 `actions` 和 `templates` 两个目录。

* 初始情况下建立了一条路由 `/weather/:city`。因此我们访问 `http://localhost:8200/weather/shanghai` 可以命中这条路由规则，进入对应的 Action。（位于 `actions/weather.js`）

* 在 Action 中，使用 `ctx` 对象的各个属性来获取 URL 上的信息。例如当访问 URL 是 '/weather/shanghai?type=text' 时
    * `ctx.params` 等于 `{city: 'shanghai'}`
    * `ctx.query` 等于 `{type: 'text'}`

* 在 Action 中，可以发送请求获取数据，支持 async/await。

* 在 Action 中，使用 `render` 方法给模板提供数据并渲染 HTML，传递给 `ctx.body`。

* 在 Template 中，使用 `<%= ... %>` 输出变量
