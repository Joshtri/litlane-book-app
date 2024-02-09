const express = require('express');
const { mainUserPage, mainBookPage, detailBookUser, createComment, getComments } = require('../controllers/mainUser');
const Comment = require('../models/Comment');
const router = express.Router();



router.get('/', mainUserPage);
router.get('/main',mainBookPage);
router.get('/detail_book/:id', detailBookUser);
router.post('/comments', createComment);
router.get('/get_comments/:bookId', getComments)


router.get('/get_total_comments/:posted_book_id', async (req, res) => {
    try {
        const { posted_book_id } = req.params;
        const totalComments = await Comment.countDocuments({ posted_book_id });
        res.send(totalComments.toString());
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching total comments');
    }
});




module.exports = router;