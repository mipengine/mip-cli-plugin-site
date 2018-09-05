## mip2 cli 用户自定义命令插件 开发示例

[开始扩展自定义命令](https://github.com/mipengine/mip2/blob/master/docs/cli/cli-user-plugin.md)

项目结构如下：

```
├── cli
│   ├── foo
│   │   └── bar.js    // 对应子命令，mip2 foo bar
│   └── foo.js        // 对应主命令，mip2 foo
├── index.js          // 模块入口
├── lib               // 建议把业务逻辑写在 lib 目录
├── package.json
└── README.md
```

`cli` 目录是命令的入口，所有的命令都应该放在这里。
`mip2 foo` 会自动读取 `cli/foo.js` 对应的模块。同理：
`mip2 foo bar` 会自动读取 `cli/foo/bar.js` 对应的模块。

> 注意：模块名称与命令名称必须保持一致，否则会找不到对应的模块

### 配置扩展命令

自定义扩展命令可以通过命令模块中的 `cli.config` 进行配置：

``` javascript
  config: {
    // 命令描述信息，显示在命令列表说明中
    description: 'foo bar 功能测试',

    // 和 usage 一起组成 Usage 信息
    name: 'mip2 foo',

    // <id> 表示 id 为必选参数，[id] 表示 Id 为可选参数
    usage: '<id>',

    // 命令 options
    options: [
      ['-f, --force', '强制执行'],
      ['-p, --port <value>', '端口号']
    ],

    // 帮助信息， --help 时显示
    help: [
      '',
      '  Examples:',
      '    # 测试自定义 plugin 命令',
      '    $ mip2 foo <id> -f',
      '    # 测试自定义 plugin 命令',
      '    $ mip2 foo <id> -p 8888'
    ].join('\n')
  },
```

### 扩展命令入口

`cli.main` 是命令执行的入口

``` javascript
  /**
   * 命令执行入口
   *
   * @param {Array} 命令接收的参数数组
   * @param {Object} 命令配置的 options 对象。option 接收 <value> 时获取值，否则返回 boolean 类型
   */
  main: function (args, opts) {
    // your own stuff
    console.log('args: ')
    console.log(args)
    console.log('opts: ')
    console.log('opts.force: ' + opts.force)
    console.log('opts.port: ' + opts.port)
  }
```
