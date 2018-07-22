# upload



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org

## 使用指南

- 实例中有两个上传文件的实例，单文件上传和多文件上传。启动项目分别访问：'/'单文件上传，'/multi_upload_page'，多文件上传。
- 实例参考egg上传文件官方实例： https://github.com/eggjs/examples/tree/master/multipart
- 自己处理的问题：上传过程需要根据路径新建文件夹。写了一个根据路径循环生成文件夹的工具类。extend/fileUtils
- 上传文件名：可以用uuid根据时间戳生成随机数，确保文件名不重复。如果不修改文件名，新文件会覆盖重名的源文件。
- egg渲染html页面需要插件：  
    
       
```
exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks',
   };
```
- config/config.default.js中需要对上传的文件名和文件大小进行配置，默认大小为10M，几百M的文件也可以传成功。

```
  config.multipart = {
    //设置支持的上传文件类型
    whitelist: [ '.apk', '.pptx', '.docx', '.csv', '.doc', '.ppt', '.pdf', '.pages', '.wav', '.mov','.txt','.png' ],
    //设置最大可以上传300M
    fileSize: '300mb',

  };
```  
  
  
## 使用方法
- 进行config中相关文件配置，egg-multipart是egg模块中自带的，无需手动安装，fs、path、mz-modules/pump等都是内置的，无需安装。
- 引入fileUtils文件
- 参考home.js单文件和多文件上传的实例，可以实现上传。

