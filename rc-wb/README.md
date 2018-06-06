## 看我 ！！！！！

## 使用方式

* 在项目根目录下创建.reactConfig配置文件
```
// 例子：

{
  "entry": ["./app.js"],    // 入口文件配置
  "port": "9998",           // 服务启动端口
  "publicPath": "/",        // 上线打包配置，通常为线上服务器根目录
  "proxy": [{               // 本地代理模式
    "context": ["/upload", "/accountJP", "/planJP", "/statistics", "/searchPlan", "/flow", "/targetAdPlan", "/userVoucher"],
    "target": "http://e.4399.cn:8113",
    "changeOrigin": "true"
  }]
  "alias": {
    "utils": "./src/utils"
  },
  "extract": {

  } // 此选项中的配置可以跟webpack一致，开发者如果不满意的话可自行配置来覆盖工具的默认配置
}

```
* 命令行使用方式

```
rc-ued server     // 启动服务
rc-ued build      // 打包配置
```

## 您可能需要独自安装下面的包 -- 推荐安装依赖

```
"devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-plugin-syntax-dynamic-import": "^6.18.0",
    "babel-plugin-transform-decorators-legacy": "^1.3.4",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "cross-env": "^5.1.6",
    "css-loader": "^0.28.7",
    "file-loader": "^0.11.2",
    "node-sass": "^4.5.3",
    "sass-loader": "^6.0.6",
    "style-loader": "^0.18.2",
    "url-loader": "^0.5.9"
}
```