const faker = require('faker');
const moment = require('moment');
//models.
const Book = require('../models/Book');
const Comment = require('../models/Comment');
const { getStorage, ref, list, deleteObject ,uploadBytesResumable, getDownloadURL } = require('firebase/storage')
// const { signInWithEmailAndPassword, createUserWithEmailAndPassword } = require("firebase/auth");
const { auth } = require('../config/firebaseConfig');
const storageFB = getStorage();


//** jangan lupa ubah nama function utk laman utama atau welcome pagenya. */
exports.mainUserPage = (req,res)=>{
    const locals = {
        title : "Litlane Book",
        description : "Litlane Book - Welcome Page"
    }

    res.render('index',
    {
        locals
    });
}


exports.mainBookPage = async (req, res) => {

    const locals = {
        title : "Main Page-Book",
        description : "Main Page book Litlane Book App"
    }

    try {
        const books = await Book.find();

        // Menyiapkan data untuk ditampilkan di tabel
        const dataForTable = await Promise.all(books.map(async (item) => {
            const fileName = item.book_cover;
            const storageRef = ref(storageFB, fileName);
            const imageUrl = await getDownloadURL(storageRef);

            return {
                ...item.toObject(),  // Spread operator untuk menyertakan semua properti dari objek buku
                imageUrl,
            };
        }));

        res.render('main_PageBook', {
            books: dataForTable,
            locals
        });

    } catch (error) {
        console.log(error);
    }
}

exports.detailBookUser = async (req, res) => {
    const locals = {
        title: "Detail Book",
        description: "Detail book Litlane Book App"
    };

    try {
        const itemId = req.params.id;
        const book = await Book.findById(itemId);
        const messageComment = await req.flash('commentInfo');

        if (!book) {
            return res.status(404).send('Book not found');
        }

        const fileName = book.book_cover;
        const storageRef = ref(storageFB, fileName);
        const imageUrl = await getDownloadURL(storageRef);

        // Mengambil komentar berdasarkan ID buku
        const comments = await Comment.find({ posted_book_id: itemId });

        // Menghitung total komentar berdasarkan ID buku
        const totalComments = await Comment.countDocuments({ posted_book_id: itemId });

        res.render('book_detailUser', {
            locals,
            book,
            imageUrl,
            comments, // Menyertakan komentar dalam data yang akan dirender
            messageComment,
            totalComments
        });
    } catch (error) {
        console.log(error);
    }
};


// Controller untuk menambahkan komentar baru
exports.createComment = async (req, res) => {
    try {
        const { posted_book_id, comments_text } = req.body;

        // Generate random username dengan awalan "Anonymous"
        const randomUserName = `${faker.random.uuid().substr(0, 8)}`;

        // Membuat komentar baru
        const newComment = new Comment({
            user: randomUserName,
            posted_book_id: posted_book_id,
            comments_text: comments_text
        });

        // Menyimpan komentar baru ke dalam basis data
        const savedComment = await newComment.save();

        await req.flash('commentInfo', 'Komentar berhasil di kirim!')
        // res.status(201).json(savedComment);
        res.redirect(`/detail_book/${posted_book_id}`)
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan komentar' });
    }
};

exports.getComments = async (req, res) => {
    try {
        const bookId = req.params.bookId; // Ambil nilai bookId dari body permintaan
        // console.log('Received bookId:', bookId); // Cetak nilai bookId ke konsol

        if (!bookId) {
            return res.status(400).json({ message: 'Book ID is required in the request body' });
        }

        const comments = await Comment.find({ posted_book_id: bookId }); // Ambil komentar berdasarkan bookId dari basis data

        // Konversi createdAt ke format tanggal yang diinginkan
        const formattedComments = comments.map(comment => ({
            ...comment.toObject(), // Mengonversi objek mongoose ke objek JavaScript biasa
            createdAt: moment(comment.createdAt).format('HH:mm:ss') // Format tanggal
        }));

        res.status(200).json(formattedComments); // Kirim respons dengan daftar komentar yang telah diubah formatnya
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat mengambil komentar' });
    }
};


