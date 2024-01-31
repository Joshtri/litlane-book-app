const express = require('express');
const { mainUserPage, mainBookPage, detailBookUser } = require('../controllers/mainUser');
const router = express.Router();



router.get('/', mainUserPage);
router.get('/main',mainBookPage);
router.get('/detail_book', detailBookUser)


module.exports = router;