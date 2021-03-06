# 记录开发相关的内容

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
