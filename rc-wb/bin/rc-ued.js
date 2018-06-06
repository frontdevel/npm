#!/usr/bin/env node

const program = require("commander");
const chalk = require("chalk");
const shelljs = require('shelljs');
const logSymbols = require('log-symbols');
const fs = require('fs');
const path = require('path');
const isPlainObject = require('is-plain-object');
const ora = require('ora');
const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackServer = require('webpack-dev-server');
const log = require('../utils/log');
const baseConfig = require('../config/webpack.config');
const buildConfig = require('../config/webpack.config.prod');

/**
 * @description 判断必需的配置项 
 */
const isExitsConfig = () => {
  const reactConfigJson = fs.readFileSync(`${process.cwd()}/.reactConfig`, 'utf8');
  try {
    const config = JSON.parse(reactConfigJson);
    if (isPlainObject(config)) {
      return config;
    }
  } catch(e) {
    log.error('请提供合法的json配置文件');
  }

  if (!config.entry) {
    log.warn('请提供入口文件配置');
    return false;
  } else {
    return config;
  }
}

/**
 * @description 是否存在package.json文件
 */

/**
 * 判断项目根目录文件是否存在
 */
const isExitsConfigJson = () => {
  try {
    const stat = fs.statSync(`${process.cwd()}/.reactConfig`);
    if (stat) {
      return true;
    } else {
      return false;
    }
  } catch(e) {
    return false;
  }
}

const startServer = (userConfig) => {
  const aliasConfig = {};
  userConfig.alias && Object.keys(userConfig.alias).map(v => {
    return aliasConfig[v] = path.resolve(process.cwd(), userConfig.alias[v]);
  });

  const config = merge(baseConfig, { entry: userConfig.entry, ...userConfig.extract, resolve: {
    alias: aliasConfig
  }});

  const hrmConfig = [`webpack-dev-server/client?http://localhost:${userConfig.port || 9999}/`, "webpack/hot/dev-server"];
  if (Array.isArray(config.entry)) {
    config.entry = hrmConfig.concat(config.entry);
  } else if (isPlainObject(config.entry)) {
    Object.keys(config.entry).forEach((v) => {
      config.entry[v] = hrmConfig.concat(config.entry[v]);
    });
  }

  const proxy = userConfig.proxy;
  const extract = userConfig.extract;
  const compiler = webpack(config);

  const server = new webpackServer(compiler, {
    hot: true,
    publicPath: userConfig.publicPath || '/',
    historyApiFallback: true,
    clientLogLevel: 'error',
    stats: {
      colors: true,
      chunks: false,
      assets: true,
      modules: false,
      errors: true,
      builtAt: true,
    },
    quiet: false,
    disableHostCheck: true,
    proxy,
  });

  server.listen(+userConfig.port || 9999, 'localhost', () => {
    log.success(`服务运行在http://localhost:${userConfig.port || 9999}`);
  });
};

const startBuild = (userConfig) => {
  const spinner = ora({text: '正在编译', spinner: 'circleHalves', interval: 10});
  spinner.start();

  const aliasConfig = {};
  userConfig.alias && Object.keys(userConfig.alias).map(v => {
    return aliasConfig[v] = path.resolve(process.cwd(), userConfig.alias[v]);
  });
  
  const config = merge(buildConfig, {
    entry: userConfig.entry,
    output: {
      publicPath: userConfig.publicPath
    },
    resolve: {
      alias: aliasConfig
    }
  });

  webpack(config, (err, stats) => {
    if (err) {
      spinner.fail(err.stack || err);
      if (err.details) {
        spinner.fail(err.details);
      }
      return;
    }

    const info = stats.toJson({ assets: false, hash: true, colors: true });

    if (stats.hasErrors()) {
      spinner.fail(info.errors);
      return;
    }

    spinner.succeed('编译成功');
  });
};

/**
 * @description 读取webpack文件配置
 */
const runServer = () => {
  const userConfig = isExitsConfig();
  if (userConfig) {
    startServer(userConfig);
  }
};

/**
 * @description 打包配置
 */
const runBuild = () => {
  const userConfig = isExitsConfig();
  if (userConfig) {
    if(!process.env.NODE_ENV) {
      log.error('请提线上环境变量配置例如：cross-env NODE_ENV=production');
      return;
    };
    startBuild(userConfig);
  }
};

program
  .version('1.0.0')
  .option('build', '打包代码')
  .option('server', '启动本地开发服务')
  .parse(process.argv)

if (program.server) {
  if (!isExitsConfigJson()) {
    log.error('请在项目根目录下创建 .reactConfig 的文件');
  } else {
    runServer();
  }
};

if (program.build) {
  if (!isExitsConfigJson()) {
    log.error('请在项目根目录下创建 .reactConfig 的文件');
  } else {
    runBuild();
  }
};
