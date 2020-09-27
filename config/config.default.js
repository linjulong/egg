/* eslint valid-jsdoc: "off" */

'use strict';
const os = require('os');
///////////////////获取本机ip///////////////////////
function getIPAdress() {
  var interfaces = os.networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

const myHost = getIPAdress();

const ignoreUrl = require('./ignoreUrl');

const { Status, Code } = require('./statusCode');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1591158290618_522';

  // add your middleware config here
  config.middleware = ['authorization'];
  config.authorization = {
    enable: false,
    match(ctx) {
      const url = ctx.request.url;
      return ignoreUrl.some(item => url.startsWith(item)) ? false : true;
    },
  };

  //配置端口信息
  config.cluster = {
    listen: {
      port: 7001,
      hostname: myHost,
    }
  };

  //配置跨域
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    domainWhiteList: [`http://${myHost}:${myHost}`]
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };

  config.jwt = {
    app: {
      secret: "app-egg-init",
      expiresIn: '12000h'
    },
    web: {
      secret: "web-egg-init",
      expiresIn: '2h'
    },
    appSecret: "app-egg-init", //自己设置的值
    webSecret: "web-egg-init",
    appExpiresIn: '12000h',
    webExpiresIn: '2h'
  };

  //配置数据库
  config.sequelize = {
    dialect: 'mysql',
    // dialectOptions: {
    //     charset: 'utf8mb4',
    // },
    // charset: 'utf8',
    host: '127.0.0.1',
    port: 3306,
    database: 'egg-init',
    username: 'root',
    password: '684319',
    timezone: '+08:00', // 保存为本地时区
    dialectOptions: {
      dateStrings: true,
      typeCast(field, next) {
        // for reading from database
        if (field.type === "DATETIME") {
          return field.string();
        }
        return next();
      }
    },
    define: {
      freezeTableName: true,
      timestamps: false,
      //解决中文输入问题
      charset: 'utf8mb4'
    },
    // sync: { force: true }
  };

  // add your user config here
  const userConfig = {
    appid: 'wxd971096469cfb7d7',
    secret: '0e7fa9bed1f825d28dc52506faeef712',
    access_token: '',
    Status,
    Code
  };

  return {
    ...config,
    ...userConfig,
  };
};
