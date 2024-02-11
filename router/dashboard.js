const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../auth/protect');
const {dashboardPage, totalBooksJSON, totalCommentJSON} = require('../controllers/dashboardUserController');


router.get('/dashboardUser', isLoggedIn,dashboardPage);
router.get('/getTotalBooks', isLoggedIn, totalBooksJSON);
router.get('/getTotalComments', isLoggedIn, totalCommentJSON);
module.exports = router;