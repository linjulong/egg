const axios = require('axios');

const getOpenid = async function (appid, secret, code) {
    const resData = await axios.get('https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code');
    return resData.data;
}

module.exports = {
    getOpenid: getOpenid
}