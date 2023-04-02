/**
 * 上传文件 不限于图片
 */

const multer = require("multer")

const fs = require("fs")
const path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../static/upload")
  },

  filename: function (req, file, cb) {
    //1、获取后缀名
    let extname = path.extname(file.originalname);
    //2、根据时间戳生成文件名
    cb(null, Date.now() + extname)
  }
})

// 创建文件夹
function createFolder(folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
}

var uploadFolder = '../../static/upload';
createFolder(uploadFolder);
var upload = multer({ storage: storage });

// 任何文件
module.exports = function (router,sqlFn) {
  router.post('/upload', upload.single('file'), function (req, res, next) {
    req.acceptsCharsets = "utf8"
    res.charset = "utf8"
    var file = req.file;
    res.send({ res_code: '0', file });
  });
}
