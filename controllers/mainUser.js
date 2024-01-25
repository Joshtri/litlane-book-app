const Book = require('../models/Book');


//** jangan lupa ubah nama function utk laman utama atau welcome pagenya. */
exports.mainUserPage = (req,res)=>{
    res.render('index');
}


exports.mainBookPage = async (req,res)=>{
    const books = await Book.find({});
    res.render('main_PageBook',{
        books
    });
}