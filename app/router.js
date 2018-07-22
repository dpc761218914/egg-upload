'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/', controller.home.index);
  router.post('/form', controller.home.upload);
  router.get('/multi_upload_page', controller.home.multi_upload_page);
  router.post('/multi_upload', controller.home.multi_upload);
};
