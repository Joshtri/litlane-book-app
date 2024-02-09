const express = require('express');
const router = express.Router();

const {loginPage,createAdminAccount, postLoginUser} = require('../controllers/loginController');



router.get(`/${process.env.API_BASE_URL_LOG}`, loginPage)

router.post('/postCreate_Account', createAdminAccount)

router.post('/postLogin_User', postLoginUser)
module.exports = router;