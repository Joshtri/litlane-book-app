const express = require('express');
const router = express.Router();

const upload = require('../config/upload');

const {isLoggedIn} = require('../auth/protect');
const {bookPageView, postBook, addBook, detailBook, editBook, postEditBook, postDeleteBook} = require('../controllers/bookController');

router.get('/data_book',bookPageView ); //get view
// router.get('/data_book',isLoggedIn,bookPageView ); //get view
router.get('/add_book', addBook); // get view
router.post('/post_book', upload.single('book_cover'),postBook); // post book data
router.get('/detail_book/:id', detailBook) //get view
router.get('/edit_book/:id', editBook); // get view.

router.put('/post_edit_book/:id', postEditBook);


router.delete('/post_delete_book/:id',postDeleteBook)
module.exports = router;