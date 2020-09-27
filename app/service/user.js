'use strict';
const request = require('../api');

const Service = require('egg').Service;

class UserService extends Service {
    async create(code) {
        const { ctx } = this;
        const userData = await request.getOpenid(this.config.appid, this.config.secret, code);
        await ctx.model.User
            .findOrCreate({ where: { openid: userData.openid }, defaults: { openid: userData.openid, session_key: userData.session_key } })
            .spread(async function (user, created) {
                //如果账号不存在则新增created返回true 如果已经存在返回false
                if (!created) {
                    //更新session_key
                    await ctx.service.user.update(userData.openid, { session_key: userData.session_key });
                }
            }).catch(async function (error) {
                //handle error
                await ctx.service.user.update(userData.openid, { session_key: userData.session_key });
            });
        return userData.openid;
    }

    async update(openid, data) {
        //console.log(data)
        const { ctx } = this;
        await ctx.model.User.update(data, { where: { openid: openid } });
    }

    async getUserInfo(openid) {
        const { ctx } = this;
        return await ctx.model.User.findByPk(openid, { raw: true });
    }
}

module.exports = UserService;