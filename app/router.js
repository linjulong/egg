'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  //app
  router.post('/app/base/login', controller.base.appLogin);
  router.get('/app/user/index', controller.user.index);
  router.post('/app/user/getPhone', controller.user.getPhone);
  router.post('/app/user/updateUserInfo', controller.user.updateUserInfo);

  //web
  router.post('/web/base/login', controller.base.webLogin);
  router.get('/web/user/info', controller.user.webUserInfo);
};
