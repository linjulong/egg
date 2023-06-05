'use strict';

const Controller = require('egg').Controller;
const { WXBizDataCrypt } = require('../utils');

class UserController extends Controller {
    async index() {
        const { ctx } = this;
        ctx.responseMsg(ctx.app.config.Status.SUCCESS.OK, { msg: 'ok,user/index' });
    }

    async getPhone() {
        const { ctx } = this;

        try {
            ctx.validate({
                encryptedData: 'phone.encryptedData',
                iv: 'phone.iv'
            });
        } catch (error) {
            ctx.responseMsg(ctx.app.config.Status.FAIL.UNPROCESABLE_ENTITY.CODE, { msg: ctx.app.config.Status.FAIL.UNPROCESABLE_ENTITY.MSG });
            return;
        }

        const { encryptedData, iv } = ctx.request.body;
        //解密token获取openid，查询sessionKey
        const openid = await ctx.verify();
        const userInfo = await ctx.service.user.getUserInfo(openid);
        console.log(userInfo)
        var pc = new WXBizDataCrypt(this.app.config.appid, userInfo.session_key);
        var data = pc.decryptData(encryptedData, iv);
        await ctx.service.user.update(openid, { phone: data.phoneNumber });
        delete data.watermark;
        ctx.responseMsg(ctx.app.config.Status.SUCCESS.OK, { msg: 'ok', data });
    }

    async updateUserInfo() {
        const { ctx } = this;
        const openid = await ctx.verify();
        await ctx.service.user.update(openid, ctx.request.body);
        ctx.responseMsg(ctx.app.config.Status.SUCCESS.CREATED, { msg: 'ok' });
    }

    async webUserInfo() {
        const { ctx } = this;
        ctx.body = {
            code: 20000,
            data: {
                roles: ['editor'],
                introduction: 'I am a super administrator',
                avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
                name: 'Super Admin'
            }
        }
    }
}

module.exports = UserController;
