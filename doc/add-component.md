# mip2 site add-component

为项目添加一个组件模板，可以在站点根目录执行该命令，方便在项目中新组件的开发。

## 使用方法

### 前置条件

1. 全局安装 `npm i mip2 -g`

2. 初始化站点项目 `mip2 site init` [init 文档](https://github.com/mipengine/mip-cli-plugin-site/blob/master/doc/init.md)

3. `cd` 到目录中并使用 `npm i` 安装依赖

4. 启动 MIP 站点开发服务器 `mip2 site dev` [dev 文档](https://github.com/mipengine/mip-cli-plugin-site/blob/master/doc/dev.md)，预览示例组件[mip-example](http://localhost:8200/components/mip-example/example/mip-example.html)


### 命令及参数


`mip2 site add-component`  新增默认组件模板 mip-example

`mip2 site add-component <component-name>` 新增特定名称的组件模板

`mip2 site add-component <component-name> -f`  如果存在同名组件，强行覆盖, -f 或 --force 同样适用

> 添加组件时，注意遵守组件开发的[命名及相关规范](https://mip-project.github.io/v2/guide/mip-standard/mip-components-spec.html)
 

示例：
``` bash

# 不写组件名时，默认添加 mip-example 组件
mip2 site add-component

# 添加默认的 mip-example 组件
mip2 site add-component mip-example1

# 添加组件名已存在时，可通过 -f 或 --force 参数强行新建覆盖原组件
mip2 site add-component mip-example1 -f

```



### 开发调试

1. 启动 MIP 站点开发服务器 `mip2 site dev` [dev 文档](https://github.com/mipengine/mip-cli-plugin-site/blob/master/doc/dev.md)

2. 预览新增组件链接：`http://localhost:8200/components/{组件名}/example/{组件名}.html`



