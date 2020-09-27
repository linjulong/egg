module.exports = {
    async verify() {
        const token = this.get('Authorization');
        const url = this.request.url;
        const secret = url.startsWith('/app') ? this.app.config.jwt.appSecret : this.app.config.jwt.webSecret;
        return this.app.jwt.verify(token, secret).openid;
    },
    async responseMsg(code, info) {
        // const { ctx } = this;
        this.status = code;
        this.body = info;
    }
};