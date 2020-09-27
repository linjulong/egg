'use strict';

const Service = require('egg').Service;

class AdminService extends Service {
    async login(username) {
        const { ctx } = this;
        return await ctx.model.Admin.findByPk(username, { raw: true });
    }
}

module.exports = AdminService;
