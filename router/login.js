const express = require('express');
const router = express.Router();

const {loginPage} = require('../controllers/loginController');


router.get('/login', loginPage)

module.exports = router;