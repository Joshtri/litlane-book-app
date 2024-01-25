const express = require('express');
const { mainUserPage, mainBookPage } = require('../controllers/mainUser');
const router = express.Router();



router.get('/', mainUserPage);
router.get('/main',mainBookPage);



module.exports = router;