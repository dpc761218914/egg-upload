'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532240632195_6962';

  // add your config here
  config.middleware = [];

  config.view = {
    defaultViewEngine: 'nunjucks',
  };

  config.multipart = {
    //设置支持的上传文件类型
    whitelist: [ '.apk', '.pptx', '.docx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov','.txt','.png' ],
    //设置最大可以上传300M
    fileSize: '300mb',

  };

  return config;
};
