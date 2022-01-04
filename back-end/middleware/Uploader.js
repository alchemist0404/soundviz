const multer = require('multer')
var md5 = require('md5');

class UploaderManager {
  constructor(filePath) {
    this.assetsPath = filePath;
    this.storage = multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, filePath);
      },
      filename: function(req, file, cb) {
        cb(null, md5(String(new Date().valueOf())) +'.'+ file.originalname.split('.')[file.originalname.split('.').length - 1]);
      }
    });
  }
}
module.exports  = UploaderManager;