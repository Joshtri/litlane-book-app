const express = require('express');
const router = express.Router();

const {loginPage,createAdminAccount, postLoginUser} = require('../controllers/loginController');


// Make sure process.env.API_BASE_URL_LOG is defined and not undefined
if (!process.env.API_BASE_URL_LOG) {
    throw new Error("API_BASE_URL_LOG environment variable is not defined.");
}

router.get(`/${process.env.API_BASE_URL_LOG}`, loginPage)

router.post('/postCreate_Account', createAdminAccount)

router.post('/postLogin_User', postLoginUser)
module.exports = router;