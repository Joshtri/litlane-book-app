const bcrypt = require('bcrypt')
const Admin = require('../models/Admin');



//Get View
exports.loginPage = (req,res)=>{

    const locals = {
        title : "Login Page",
        description : "Login Page IS Selling"
    }
    res.render('login',{
        locals
    });

}


//GET