module.exports = app => {

    let { validator } = app;

    // 添加自定义参数校验规则
    validator.addRule('phone.encryptedData', (rule, value) => {
        if (!value) {
            return 'encryptedData can not be empty';
        } else if (value == 'undefined' || value == '') {
            return 'encryptedData can not be undefined';
        }
    });

    validator.addRule('phone.iv', (rule, value) => {
        if (!value) {
            return 'iv can not be empty';
        } else if (value == 'undefined' || value == '') {
            return 'iv can not be undefined';
        }
    });
};