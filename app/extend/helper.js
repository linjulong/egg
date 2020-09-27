// app/extend/helper.js
module.exports = {
    getPlatformConfig(key) {//根据不同的平台获取
        const { ctx } = this;
        const url = ctx.request.url;
        const platform = url.startsWith('/app') ? 'app' : 'web';
        return ctx.app.config.jwt[platform][key];
    }
};