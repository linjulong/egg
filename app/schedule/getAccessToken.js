async function getAccessToken(ctx) {
    const result = await ctx.curl(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${ctx.app.config.appid}&secret=${ctx.app.config.secret}`, {
        dataType: 'json'
    });

    console.log("初始化获取access_token：" + result.data.access_token)

    return result.data.access_token;
}

module.exports = {
    schedule: {
        interval: '7200s',
        type: 'all', // 指定所有的 worker 都需要执行
        immediate: false //项目启动就执行一次定时任务
    },
    async task(ctx) {
        const access_token = await getAccessToken(ctx);
        ctx.app.config.access_token = access_token;
    }
};