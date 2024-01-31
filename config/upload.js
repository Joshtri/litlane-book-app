
const multer = require('multer');
const path = require('path');



//buat variabel untuk menyimpan file apa saja
var storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, 'uploads/')
    },

    filename: function(req,file,cb){
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});


var upload  = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        const allowedMimeTypes = ["image/png", "image/jpg", "image/jpeg", "image/gif"];

        if (allowedMimeTypes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            console.log('Only JPG, JPEG, PNG, and GIF files are supported');
            callback(null, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 2
    }
});

module.exports = upload;