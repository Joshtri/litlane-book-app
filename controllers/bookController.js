const Book = require('../models/Book');
const mongoose = require('mongoose');

const { upload, uploadMultiple } = require('../middleware/multer')

const { getStorage, ref, list, deleteObject ,uploadBytesResumable, getDownloadURL } = require('firebase/storage')
const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require('../config/firebaseConfig');
const storageFB = getStorage();
// const path = require('path');
// const fs = require('fs').promises;


/* start controller for POST BOOK*/
// Fungsi untuk mengunggah file ke Firebase Storage dan menyimpan data teks ke MongoDB
async function uploadImage(file, bookData, quantity) {
    try {
        // Sign in ke Firebase jika belum
        await signInWithEmailAndPassword(auth, process.env.FIREBASE_USER, process.env.FIREBASE_AUTH);

        // Mengunggah file ke Firebase Storage
        const dateTime = Date.now();
        const fileName = `images/${dateTime}`;
        const storageRef = ref(storageFB, fileName);
        const metadata = {
            contentType: file.type,
        };
        await uploadBytesResumable(storageRef, file.buffer, metadata);

        // Menyimpan data teks ke MongoDB jika diperlukan
        if (quantity === 'single') {
            const newBook = new Book({
                title_book: bookData.title_book,
                author: bookData.author,
                publisher: bookData.publisher,
                publication_year: bookData.publication_year,
                number_of_page: bookData.number_of_page,
                book_description : bookData.book_description,
                // createdAt:bookData.createdAt
                book_pdf : bookData.book_pdf,
                book_cover: fileName,
            });

            // Menyimpan item ke MongoDB
            await newBook.save();
        }

        return fileName;
    } catch (error) {
        console.error(error); // Mencetak kesalahan ke konsol
        throw error;
    }
}

exports.postBook = async (req,res)=>{

    // console.log(req.body);
    const file = {
        type: req.file.mimetype,
        buffer: req.file.buffer,
    };

    const itemData = {
        title_book: req.body.title_book,
        author: req.body.author,
        publisher: req.body.publisher,
        publication_year: req.body.publication_year,
        number_of_page: req.body.number_of_page,
        book_description : req.body.book_description,
        // createdAt:req.body.createdAt
        book_pdf : req.body.book_pdf
    };


    try {

        // Memanggil fungsi untuk mengunggah file dan menyimpan data teks
        const buildImage = await uploadImage(file, itemData, 'single'); // Sesuaikan 'single' atau 'multiple' sesuai logika Anda

        // Mengirim respons dengan informasi yang diinginkan
        res.send({
            status: 'SUCCESS',
            imageName: buildImage,
            uploadedData: itemData, // Menyertakan variabel data yang diinput untuk MongoDB
        });
        // await Book.create(newBook);
        // // res.render('add_customer');

        // await req.flash('info', 'Buku baru telah ditambahkan.');
        // res.redirect('/data_book'); //back to data_book.
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

/* end controller for POST BOOK*/



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
        const message_edit = await req.flash('editInfo')
        res.render('data_book',{
            locals,
            message,
            message_edit,
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



exports.detailBook = async (req,res)=>{

    const locals = {
        title : "Detail Book",
        description : "",
    }
    try {

        const itemId = req.params.id;
        const book = await Book.findById(itemId);

        if (!book) {
            return res.status(404).send('Book not found');
        }

        const fileName = book.book_cover;
        const storageRef = ref(storageFB, fileName);
        const imageUrl = await getDownloadURL(storageRef);

        // const book = await Book.findOne({_id:req.params.id})
        res.render('detail_book',{
            book,
            locals,
            imageUrl,
        })
    } catch (error) {
        console.log(error);
    }
}


/*
GET VIEW PAGE EDIT BOOK.
*/
exports.editBook = async (req, res) => {
    const locals = {
        title: "Edit Book",
        description: "Edit Book in IS Selling"
    };

    try {
        const book = await Book.findOne({ _id: req.params.id });

        if (book) {
            res.render('edit_book', {
                book,
                locals
            });
        } else {
            // Handle the case where the book is not found
            res.status(404).send('Book not found');
        }
    } catch (error) {
        // Handle other errors
        console.error('Error fetching book:', error);
        res.status(500).send('Internal Server Error');
    }
};



/*
POST DATA EDIT BOOK.
*/


exports.postEditBook = async(req,res)=>{
    try {
        await Book.findOneAndUpdate({
            title_book :  req.body.title_book,
            author : req.body.author,  
            publisher : req.body.publisher, 
            publication_year : req.body.publication_year,
            number_of_page : req.body.number_of_page
        }).where(req.params.id);


        await req.flash('editInfo', 'Update data buku berhasil !')

        res.redirect('/data_book');
    } catch (error) {
        console.log(error);
    }
};

/*
DELETE DATA EDIT BOOK.
*/


exports.postDeleteBook = async (req, res) => {
    try {

        const itemId = req.params.id;

        // Temukan item berdasarkan ID
        const book = await Book.findById(itemId);

        if (!book) {
            return res.status(404).send('Item not found');
        }

        // Dapatkan file ID dan hapus item dari MongoDB
        const fileName = book.fileId;
        await Book.findOneAndDelete(itemId);

        // Hapus file dari Firebase Storage
        const storageRef = ref(storageFB, fileName);
        await deleteObject(storageRef);

        // await Book.deleteOne({_id:req.params.id});
        await req.flash('deleteInfo', 'Data buku berhasil di hapus')
        res.redirect('/data_book')

    } catch (error) {
        console.log(error);
    }
};

