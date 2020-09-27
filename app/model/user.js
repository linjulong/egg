module.exports = app => {
    const { STRING } = app.Sequelize;
    const User = app.model.define('user', {
        openid: { type: STRING(50), allowNull: false, primaryKey: true, unique: true, comment: "用户唯一标识" },
        session_key: { type: STRING(50), allowNull: false, comment: "会话密钥" },
        avatarUrl: { type: STRING(200), allowNull: true, comment: "头像" },
        city: { type: STRING(50), allowNull: true, comment: "城市" },
        country: { type: STRING(20), allowNull: true, comment: "国籍" },
        nickName: { type: STRING(50), allowNull: true, comment: "昵称" },
        province: { type: STRING(50), allowNull: true, comment: "省份" },
        phone: { type: STRING(11), allowNull: true, comment: "手机号码" }
    });
    User.associate = function () {

    }
    return User;
};