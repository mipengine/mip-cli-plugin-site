# mip2 site build-component

编译组件，`mip2 site build-component` 可以将某个组件编译成单个文件，方便在页面中引入使用。使用前的准备工作请参照[README.md](https://github.com/mipengine/mip-cli-plugin-site/blob/master/README.md)。下面对此命令的配置项进行详细的说明。

## 配置项

## -a

`-a, --asset <value>` 静态资源 publicPath

```bash
# 示例
mip2 site build-component -a /dist
```

## -d

`-d, --dir <value>` 项目文件夹路径，可以是绝对路径，一般就是项目根目录下的 mip-component。

- 用法

```bash
# 示例
mip2 site build-component -d /Users/xxx/to/your/project/mip-component
```


## -o

`-o, --output <value>` 编译代码输出路径，可以是绝对路径，也可以是相对路径，相对路径指的是相对于项目根目录下的 mip-component 而言。

- 用法


```bash
# 示例
mip2 site build-component -o ./dist
```

## -c

`-c, --clean` 构建前先清空输出目录

- 用法


```bash
# 示例
mip2 site build-component -c
```

## -i

`-i, --ignore [value]` 忽略沙盒注入或校验，可选参数为 -i sandbox, -i whitelist, -i sandbox,whitelist; -i 默认为 -i sandbox, -i all 默认为 -i sandbox,whitelist

- 用法


```bash
# 示例
mip2 site build-component -i sandbox
```

## -e

`-e, --env <value>` NODE_ENV 环境变量，默认为 "production"

- 用法


```bash
# 示例
mip2 site build-component -e production
```


## -h

`-h, --help` 显示帮助使用信息

- 用法


```bash
# 示例
mip2 site build-component -h
```