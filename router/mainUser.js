const express = require('express');
const Comment = require('../models/Comment');
const { mainUserPage, mainBookPage , createSubscriptor, detailBookUser, createComment, getComments } = require('../controllers/mainUser');
// const { createSubscriptor } = require('../controllers/subscriptorkController');
const router = express.Router();



router.get('/', mainUserPage);
router.get('/main',mainBookPage);
router.post('/subscribe_website', createSubscriptor);
router.get('/detail_book/:id', detailBookUser);
router.post('/comments', createComment);
router.get('/get_comments/:bookId', getComments);


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

router.get('/about',(_,res)=>{
    res.render('about_Page');
});




module.exports = router;