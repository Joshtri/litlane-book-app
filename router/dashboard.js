const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../auth/protect');
const {dashboardPage, totalBooksJSON} = require('../controllers/dashboardUserController');


router.get('/dashboardUser', isLoggedIn,dashboardPage)
router.get('/getTotalBooks', isLoggedIn, totalBooksJSON)

module.exports = router;