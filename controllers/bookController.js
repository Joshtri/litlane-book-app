const Book = require('../models/Book');
const mongoose = require('mongoose');



exports.bookPageView = async (req,res) =>{
    const locals = {
        title: 'Data Book',
        description: 'Data Book of IS Selling'
    }

    let perPage = 12;
    let page = req.query.page || 1;


    try {
        const books = await Book.aggregate([{ $sort: { createdAt: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();    

        // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
        // const count = await Customer.count();
        const count = await Book.countDocuments({});

        const message = await req.flash('info');
        res.render('data_book',{
            locals,
            message,
            books,
            current : page,
            pages: Math.ceil(count / perPage),
        });
    } catch (error) {
        console.log(error);
    }
}

exports.addBook = async (req,res)=>{
    res.render('add_book');
}

exports.postBook = async (req,res)=>{

    // console.log(req.body);

    const newBook= new Book({
        title_book: req.body.title_book,
        author: req.body.author,
        publisher: req.body.publisher,
        publication_year: req.body.publication_year,
        number_of_page: req.body.number_of_page,
        // createdAt:req.body.createdAt
        book_pdf : req.body.book_pdf
    });

    if (req.file) {
        newBook.book_cover = req.file.path; // Update to use 'book_cover'
    }
    
    try {
        await Book.create(newBook);
        // res.render('add_customer');

        await req.flash('info', 'Buku baru telah ditambahkan.');
        res.redirect('/data_book'); //back to data_book.
    } catch (error) {
        console.log(error);
    }
}

exports.detailBook = async (req,res)=>{

    const locals = {
        title : "Detail Book",
        description : "",
    }
    try {

        const book = await Book.findOne({_id:req.params.id})
        res.render('detail_book',{
            book,
            locals
        })
    } catch (error) {
        
    }
}


/*
GET VIEW PAGE EDIT BOOK.
*/
exports.editBook = async(req,res)=>{

    const locals = {
        title : "Edit Book",
        description : "Edit Book in IS Selling"
    }

    try {
        const book = await Book.findOne({_id:req.params.id});
        res.render('edit_book',{
            book,
            locals
        })
    } catch (error) {
        
    }
};