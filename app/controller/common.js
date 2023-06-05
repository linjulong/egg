'use strict';

const Controller = require('egg').Controller;
const path = require('path');
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
const fs = require('fs');
const mkdirp = require('mz-modules/mkdirp');
const sd = require('silly-datetime');

class CommonController extends Controller {
  async uploadFile() {
    const {
      ctx,
    } = this;
    const stream = await ctx.getFileStream();
    const filename = Math.random().toString(36).substr(2) + new Date().getTime() + path.extname(stream.filename).toLocaleLowerCase();

    const today = sd.format(new Date(), 'YYYYMMDD');
    const type = stream.mimeType.startsWith('image') ? this.config.image : this.config.file;
    const upload_dir = path.join(type, today);
    await mkdirp(upload_dir);
    const file_dir = path.join(upload_dir, filename);

    const target = path.join(this.config.baseDir, file_dir);
    const writeStream = fs.createWriteStream(target);
    let returnFile = '';

    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
      const dir = stream.mimeType.startsWith('image') ? 'images/' : 'file/';
      returnFile = 'http://' + this.app.config.cluster.listen.hostname + ':' + this.app.config.cluster.listen.port + this.config.static.prefix + dir + today + '/' + filename;
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      ctx.responseMsg(ctx.app.config.Status.FAIL.INTERNAL_SERVER_ERROR, {
        msg: '未知错误！',
      });
      throw err;
    }
    ctx.responseMsg(ctx.app.config.Status.SUCCESS.CREATED, {
      msg: '上传成功！',
      returnFile,
    });
  }
}

module.exports = CommonController;
