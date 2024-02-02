const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../auth/protect');
const {dashboardPage} = require('../controllers/dashboardUserController');


router.get('/dashboardUser', isLoggedIn,dashboardPage)


module.exports = router;