const express = require('express');
const router = express.Router();

const upload = require('../config/upload');
const {bookPageView, postBook, addBook, detailBook, editBook} = require('../controllers/bookController');

router.get('/data_book',bookPageView ); //get view
router.get('/add_book', addBook); // get view
router.post('/post_book', upload.single('book_cover'),postBook); // post book data
router.get('/detail_book/:id', detailBook) //get view
router.get('/edit_book/:id', editBook); // get view.

module.exports = router;