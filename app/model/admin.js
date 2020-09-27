module.exports = app => {
    const { STRING } = app.Sequelize;
    const Admin = app.model.define('admin', {
        username: { type: STRING(18), allowNull: false, primaryKey: true, comment: "账号" },
        password: { type: STRING(16), allowNull: false, comment: "密码" },
    });
    Admin.associate = function () {

    }
    return Admin;
};