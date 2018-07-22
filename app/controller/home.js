'use strict';

const fs = require('fs');
const path = require('path');
const Controller = require('egg').Controller;
const pump = require('mz-modules/pump');

//根据时间戳生成uuid
const uuidv1 = require('uuid/v1');

const fileUtils=require('../extend/fileUtils.js');

class HomeController extends Controller {
  async index() {
    await this.ctx.render('index.html');
  }

  //如果在同一个文件夹中上传相同的文件，新文件会将源文件覆盖掉。
  //设置上传文件大小后，几百兆的文件都可以传，默认上传大小不超过10M
  //上传单个文件。
  async upload() {
    //文件上传文件需要存储的路径需要根据需求定义
    //例如：用户模块/用户ID
    const fileLocation2='app/public/user/222';
    fileUtils.createFolderByDirname(fileLocation2);

    const stream = await this.ctx.getFileStream();
    const filename = encodeURIComponent(stream.fields.name) + path.extname(stream.filename).toLowerCase();
    const user_input_name=stream.fields.name;
    const filename1=stream.filename;
    console.log('workspace:'+this.config.baseDir);
    console.log('org_name:'+filename1);
    //用户在输入框输入的名字，实际中可以不需要，
    console.log('user_input_name:'+user_input_name);
    //拼装服务端文件名
    const serviceFileName=uuidv1()+'_'+filename1;
    const target = path.join(this.config.baseDir, fileLocation2, serviceFileName);
    const writeStream = fs.createWriteStream(target);
    await pump(stream, writeStream);
    // this.ctx.redirect('/public/' + filename1);
    const fileUrl=fileLocation2+'/' +serviceFileName;

    this.ctx.body = {success:'success',fileUrl:fileUrl};
  }

  async multi_upload_page() {
    await this.ctx.render('multi_upload.html');
  }

  async multi_upload() {

    const fileLocation2='app/public/user/111';
    fileUtils.createFolderByDirname(fileLocation2);
    const parts = this.ctx.multipart({ autoFields: true });
    const files = [];
    let stream;
    while ((stream = await parts()) != null) {
      const filename = stream.filename.toLowerCase();
      const target = path.join(this.config.baseDir, fileLocation2, filename);
      const writeStream = fs.createWriteStream(target);
      await pump(stream, writeStream);
      files.push(filename);
    }

    this.ctx.body = {success:'muti upload success'};
  }


}

module.exports = HomeController;
