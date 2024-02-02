const bcrypt = require('bcrypt')
const Admin = require('../models/Admin');
const session = require('express-session');


//Get View
exports.loginPage = async(req,res)=>{

    const locals = {
        title : "Login Page",
        description : "Login Page IS Selling"
    }

    const message = await req.flash('info');
    

    res.render('login',{
        locals,
        message
    });

}


//POST Login user. 


exports.postLoginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username });

    if (!admin) {
      req.flash('error', 'Username atau password salah.');
      return res.redirect('/login');
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (passwordMatch) {
      req.session.adminId = admin._id;
      req.session.username = admin.username;

      req.flash('success', 'Login berhasil!');
      res.redirect('/dashboardUser'); // Rute yang di-proteksi dengan middleware checkAuth
    } else {
      req.flash('error', 'Username atau password salah.');
      res.redirect('/login');
    }
  } catch (error) {
    console.log(error);
    req.flash('error', 'Terjadi kesalahan saat login.');
    res.redirect('/login');
  }
};

exports.createAdminAccount = async (req,res)=>{
    const newAdmin = {
        username : req.body.username, 
        password : req.body.password,
        email : req.body.email
    }

    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // '10' adalah jumlah putaran untuk salting

        // Tambahkan hashed password ke objek newAdmin
        newAdmin.password = hashedPassword;

        //eksekusi buat akun admin baru.
        await Admin.create(newAdmin);

        //berikan message dengan flash
        await req.flash('info', 'Akun telah dibuat!');

        res.redirect('/login')
    } catch (error) {
        console.log(error);
        // Handle error appropriately, misalnya, tampilkan pesan kesalahan kepada pengguna
        await req.flash('error', 'Terjadi kesalahan saat membuat akun.');
        res.redirect('/login'); // Redirect kembali ke halaman pendaftaran jika ada kesalahan
    }
}