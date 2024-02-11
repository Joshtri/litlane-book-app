const bcrypt = require('bcrypt')
const Admin = require('../models/Admin');
const { v4: uuidv4 } = require('uuid');

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
      // Generate a unique identifier (UUID) for the user
      const userId = uuidv4();

      // Save user information in the session
      req.session.userId = userId;
      req.session.username = admin.username;

      req.flash('successLogin', 'Selamat anda berhasil login');
      //berikan message dengan flash
      await req.flash('infoLanjut', 'Informasi UPDATE sistem dan Tampilan website akan dimulai pada tanggal 22 Februari 2024');
      return res.redirect('/mdERQU0pnVpHd08ifQ/adm/dashboardUser');
    } else {
      req.flash('error', 'Username atau password salah.');
      return res.redirect(`/${process.env.API_BASE_URL_LOG}`);
    }
  } catch (error) {
    console.error(error);
    req.flash('error', 'Terjadi kesalahan saat login.');
    return res.redirect(`/${process.env.API_BASE_URL_LOG}`);
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

        res.redirect(`/${process.env.API_BASE_URL_LOG}`)
    } catch (error) {
        console.log(error);
        // Handle error appropriately, misalnya, tampilkan pesan kesalahan kepada pengguna
        await req.flash('error', 'Terjadi kesalahan saat membuat akun.');
        res.redirect(`/${process.env.API_BASE_URL_LOG}`); // Redirect kembali ke halaman pendaftaran jika ada kesalahan
    }
}