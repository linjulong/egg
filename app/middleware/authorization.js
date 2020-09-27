module.exports = () => {
    return async function (ctx, next) {
        const { Status, Code } = ctx.app.config
        if (ctx.get('Authorization')) {
            //拿出token
            let token = ctx.get('Authorization');
            try {
                //判断url 采取不同的解密方法
                const secret = ctx.helper.getPlatformConfig('secret');
                ctx.app.jwt.verify(token, secret);
            } catch (error) {
                if (error.name == 'TokenExpiredError') {
                    ctx.responseMsg(Status.FAIL.UNAUTHORIZED, { msg: Code.FAIL.TOKEN_EXPIRED.MSG });
                    return;
                } else {
                    ctx.responseMsg(Status.FAIL.UNAUTHORIZED, { msg: Code.FAIL.TOKEN_EXPIRED.MSG });
                    return;
                }
            }
            await next();
        } else {
            ctx.responseMsg(Status.FAIL.UNAUTHORIZED, { msg: Code.FAIL.ILLEGAL_TOKEN.MSG });
            return;
        }
    }
};