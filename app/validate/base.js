module.exports = app => {

    let { validator } = app;

    // 添加自定义参数校验规则
    validator.addRule('base.code', (rule, value) => {
        if (!value) {
            return 'code can not be empty';
        } else if (value == 'undefined' || value == '') {
            return 'code can not be undefined';
        }
    });
};