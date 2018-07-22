const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump');


//递归根据目录创建文件夹，可以同时创建一串目录下所有文件夹。
/*dirname函数介绍
* var path= require("path");
  path.dirname('/foo/bar/baz/asdf/quux')
   // returns
 '/foo/bar/baz/asdf'
* */
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

//根据路径名递归创建文件名
exports.createFolderByDirname = (dirname)=> {
   mkdirsSync(dirname);
}

