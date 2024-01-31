const multer = require('multer');
const path = require('path');



var storage = multer.diskStorage({
    destination : function (req,res, cb){
        cb(null, 'uploads/pdf/')
    },

    filename: function(req,file,cb){
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})


var uploadPDF =  multer({
    storage : storage, fileFilter : function(req, file, cb){
        
        if(file.mimetype === "application/pdf"){
            callback(null,true);
        }
        else{
            console.log('only pdf file support');
            callback(null,false);
        }
    },
    limits:{
        fileSize : 1024 * 1024 * 2
    }
})

module.exports = uploadPDF;