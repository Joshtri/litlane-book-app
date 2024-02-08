const express = require('express');
const { mainUserPage, mainBookPage, detailBookUser, createComment, getComments } = require('../controllers/mainUser');
const router = express.Router();



router.get('/', mainUserPage);
router.get('/main',mainBookPage);
router.get('/detail_book/:id', detailBookUser);
router.post('/comments', createComment);
router.get('/get_comments', getComments)


module.exports = router;