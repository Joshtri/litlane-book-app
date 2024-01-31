const express = require('express');
const router = express.Router();

const upload = require('../config/upload');
const {bookPageView, postBook, addBook, detailBook, editBook, postEditBook, postDeleteBook} = require('../controllers/bookController');

const {checkAuth} = require('../auth/protect');

router.get('/data_book', checkAuth,bookPageView ); //get view
// router.get('/data_book',isLoggedIn,bookPageView ); //get view
router.get('/add_book', checkAuth,addBook); // get view
router.post('/post_book', upload.single('cover_book'),postBook); // post book data
router.get('/detail_book/:id',checkAuth, detailBook) //get view
router.get('/edit_book/:id',checkAuth, editBook); // get view.

router.put('/post_edit_book/:id', checkAuth, postEditBook);


router.delete('/post_delete_book/:id',postDeleteBook)
module.exports = router;