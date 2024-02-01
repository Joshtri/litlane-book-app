const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({

    title_book :{
        type: String,
        required : true
    },

    author : {
        type : String,
        required : true
    },

    publisher : {
        type : String,
        required : true
    },
    
    publication_year :{
        type : Date,
        required : true
    },

    number_of_page : {
        type : Number,
        required : true
    },

    book_cover : {
        type : String
        // required : true
        
    },


    //setelah dipikir-pikir sebaiknya upload link g drive ato mega saja :)
    //utk file uploadPDF.js tetap ada di local, di github di ignore.
    book_pdf : {
        type : String,
        required : true
    },

    book_description : {
        type : String,
        required : false
    }


    // createdAt : {
    //     type:Date,
    //     default : Date.now()
    // },

}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);