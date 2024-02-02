const express = require('express');
const router = express.Router();

// const upload = require('../config/upload');
const {bookPageView, postBook, addBook, detailBook, editBook, postEditBook, postDeleteBook} = require('../controllers/bookController');
const { upload, uploadMultiple } = require('../middleware/multer');
const {isLoggedIn} = require('../auth/protect');

router.get('/data_book', isLoggedIn,bookPageView ); //get view
// router.get('/data_book',isLoggedIn,bookPageView ); //get view
router.get('/add_book', isLoggedIn,addBook); // get view
router.post('/post_book', upload,postBook); // post book data
router.get('/detail_book/:id',isLoggedIn, detailBook) //get view
router.get('/edit_book/:id',isLoggedIn, editBook); // get view.

router.put('/post_edit_book/:id', isLoggedIn, postEditBook);


router.delete('/post_delete_book/:id',postDeleteBook)
module.exports = router;