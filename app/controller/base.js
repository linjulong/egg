'use strict';

const Controller = require('egg').Controller;

class BsaeController extends Controller {
    async appLogin() {
        const { ctx } = this;

        try {
            ctx.validate({
                code: 'base.code'
            });
        } catch (error) {
            ctx.responseMsg(ctx.app.config.Status.FAIL.UNPROCESABLE_ENTITY.CODE, { msg: 'code can not be undefined' });
            return;
        }

        const { code } = ctx.request.body;
        const openid = await ctx.service.user.create(code);
        const expiresIn = ctx.app.config.jwt.app.expiresIn;
        const token = await this.app.jwt.sign({ openid: openid }, this.app.config.jwt.app.secret, { expiresIn: expiresIn });
        ctx.responseMsg(ctx.app.config.Status.SUCCESS.OK, { msg: 'ok', token });
    }

    async webLogin() {
        const { ctx } = this;
        const { username, password } = ctx.request.body;
        const userInfo = await ctx.service.admin.login(username);
        const expiresIn = ctx.app.config.jwt.web.expiresIn;

        let msg = '';
        let token = '';
        let code = 0;

        if (userInfo) { //账号存在 判断密码
            if (userInfo.password == password) {
                token = await this.app.jwt.sign({ username: username }, this.app.config.jwt.web.secret, { expiresIn: expiresIn });
                msg = "登录成功！";
                code = this.app.config.Code.SUCCESS;
            } else {
                msg = this.app.config.Code.FAIL.PASSWORD_ERROR.MSG;
                code = this.app.config.Code.FAIL.PASSWORD_ERROR.CODE;
            }
        } else {
            msg = this.app.config.Code.FAIL.ACCOUNT_DOES_NOT_EXIST.MSG;
            code = this.app.config.Code.FAIL.ACCOUNT_DOES_NOT_EXIST.CODE;
        }

        if (token === '') {
            ctx.responseMsg(ctx.app.config.Status.SUCCESS.OK, {
                msg,
                code
            });
        } else {
            ctx.responseMsg(ctx.app.config.Status.SUCCESS.OK, {
                msg,
                code,
                token
            });
        }
    }
}

module.exports = BsaeController;
