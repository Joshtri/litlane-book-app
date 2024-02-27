//models.
const Book = require('../models/Book');
const Subscriptor = require('../models/Subscriptor');
const Comment = require('../models/Comment');
const BookRequest = require('../models/BookRequest');

const faker = require('faker');
const moment = require('moment');
const { promisify } = require('util');

const sleep = promisify(setTimeout); // Fungsi untuk menunggu sejumlah waktu
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


// exports.mainBookPage = async (req, res) => {

//     const locals = {
//         title : "Main Page-Book",
//         description : "Main Page book Litlane Book App"
//     }

//     try {
//         const books = await Book.find();

//         // Menyiapkan data untuk ditampilkan di tabel
//         const dataForTable = await Promise.all(books.map(async (item) => {
//             const fileName = item.book_cover;
//             const storageRef = ref(storageFB, fileName);
//             const imageUrl = await getDownloadURL(storageRef);

//             return {
//                 ...item.toObject(),  // Spread operator untuk menyertakan semua properti dari objek buku
//                 imageUrl,
//             };
//         }));

//         // Calculate current page number
//         const currentPage = req.query.page || 1;


//         // const messageSubscribe = await req.flash('SubscribeInfo');
//         res.render('main_PageBook', {
//             books: dataForTable,
//             locals,
//             current: currentPage 
//             // messageSubscribe
//         });

//     } catch (error) {
//         console.log(error);
//     }
// }

// exports.mainBookPage = async (req, res) => {
//     const locals = {
//         title: "Main Page-Book",
//         description: "Main Page book Litlane Book App"
//     };

//     try {
//         // Pagination setup
//         const itemsPerPage = 6;
//         const currentPage = parseInt(req.query.page) || 1;
//         const startIndex = (currentPage - 1) * itemsPerPage;

//         // Fetch books with pagination
//         const books = await Book.find().skip(startIndex).limit(itemsPerPage);

//         // Fetch total count of books for pagination
//         const totalCount = await Book.countDocuments();

//         // Menyiapkan data untuk ditampilkan di tabel
//         const dataForTable = await Promise.all(books.map(async (item) => {
//             const fileName = item.book_cover;
//             const storageRef = ref(storageFB, fileName);
//             const imageUrl = await getDownloadURL(storageRef);

//             return {
//                 ...item.toObject(),
//                 imageUrl,
//             };
//         }));

//         // Calculate total pages for pagination
//         const totalPages = Math.ceil(totalCount / itemsPerPage);

//         res.render('main_PageBook', {
//             books: dataForTable,
//             locals,
//             currentPage,
//             totalPages
//         });

//     } catch (error) {
//         console.error("Error fetching books:", error);
//         res.status(500).send("Internal server error.");
//     }
// };

exports.mainBookPage = async (req, res) => {
    const locals = {
        title: "Main Page-Book",
        description: "Main Page book Litlane Book App"
    };

    try {
        // Pagination setup
        const itemsPerPage = 4;
        const currentPage = parseInt(req.query.page) || 1;
        const startIndex = (currentPage - 1) * itemsPerPage;

        // Fetch books with pagination
        //// const booksPromise = Book.find().skip(startIndex).limit(itemsPerPage).lean().exec();

        // Fetch books with pagination
        const booksPromise = Book.find().sort({ createdAt: -1 }).skip(startIndex).limit(itemsPerPage).lean().exec();
        
        // Fetch total count of books for pagination
        const totalCountPromise = Book.countDocuments();

        // Menyiapkan data untuk ditampilkan di tabel
        const [books, totalCount] = await Promise.all([booksPromise, totalCountPromise]);

        const dataForTable = await Promise.all(books.map(async (item) => {
            const fileName = item.book_cover;
            const storageRef = ref(storageFB, fileName);
            const imageUrl = await getDownloadURL(storageRef);

            return {
                ...item,  // Menggunakan lean() untuk mengembalikan dokumen mentah
                imageUrl,
            };
        }));

        const messageSubscribe = await req.flash('SubscribeInfo')
        const messageBookReq = await req.flash('bookReqInfo');
        // Calculate total pages for pagination
        const totalPages = Math.ceil(totalCount / itemsPerPage);

        res.render('main_PageBook', {
            books: dataForTable,
            locals,
            currentPage,
            totalPages,
            messageSubscribe,
            messageBookReq
        });

    } catch (error) {
        console.error("Error fetching books:", error);
        res.status(500).send("Internal server error.");
    }
};



// exports.mainBookPage = async (req, res) => {
//     const locals = {
//         title: "Main Page-Book",
//         description: "Main Page book Litlane Book App"
//     }

//     try {
//         // Melakukan query ke database
//         const booksPromise = Book.find();

//         // Menetapkan batas waktu maksimum (misalnya, 5 detik)
//         const timeoutInMilliseconds = 50000; // 5 detik
//         const timeoutError = new Error('Query timeout');
//         const timeout = setTimeout(() => {
//             timeoutError.code = 'REQUEST_TIMEOUT';
//             throw timeoutError; // Melemparkan error jika waktu habis
//         }, timeoutInMilliseconds);

//         // Menunggu hasil query atau timeout (yang tercapai lebih dulu)
//         const books = await booksPromise;

//         // Menghapus timeout jika query selesai dalam waktu yang ditetapkan
//         clearTimeout(timeout);

//         // Melanjutkan dengan pemrosesan hasil query
//         const dataForTable = await Promise.all(books.map(async (item) => {
//             const fileName = item.book_cover;
//             const storageRef = ref(storageFB, fileName);
//             const imageUrl = await getDownloadURL(storageRef);

//             return {
//                 ...item.toObject(),  // Spread operator untuk menyertakan semua properti dari objek buku
//                 imageUrl,
//             };
//         }));

//                 // Calculate current page number
//                 const currentPage = req.query.page || 1;

//         // Mengirimkan respons ke klien
//         res.render('main_PageBook', {
//             books: dataForTable,
//             locals,
//             current: currentPage 
//         });

//     } catch (error) {
//         // Tangani kesalahan
//         console.log(error);
//         if (error.code === 'REQUEST_TIMEOUT') {
//             res.status(504).send('Request timeout. Please try again later.');
//         } else {
//             res.status(500).send('Internal server error.');
//         }
//     }
// }



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







// Controller untuk menambahkan komentar baru
exports.createSubscriptor = async (req, res) => {
    try {
        const { subcribe_mail } = req.body;

        // Membuat komentar baru
        const newSubscriptor = new Subscriptor({
            email_subscriptor: subcribe_mail
        });

        // Menyimpan komentar baru ke dalam basis data
        const fdf = await newSubscriptor.save();

        await req.flash('SubscribeInfo', 'Subscribe Berhasil :)')

        res.redirect('/mainBook');
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan komentar' });
    }
};


exports.postBookRequest = async (req,res)=>{
    try {

        const {book_req, email_user} = req.body;

        const newBookReq = new BookRequest({
            book_req : book_req,
            email_user : email_user
        })

        // Menyimpan komentar baru ke dalam basis data
        const fdf = await newBookReq.save();

        await req.flash('bookReqInfo', 'Permintaan E-Book telah terkirim');
        res.redirect('/mainBook');
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Terjadi kesalahan saat menambahkan komentar' });
    }
}