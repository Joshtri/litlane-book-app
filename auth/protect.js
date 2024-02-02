// auth/protect.js
const isLoggedIn = (req, res, next) => {
  const { userId, username } = req.session;
  console.log('isLoggedIn - Sesi saat ini:', { userId, username });

  if (userId && username) {
    req.user = { userId, username };
    return next();
  } else {
    req.flash('error', 'Anda harus login untuk mengakses halaman ini.');
    return res.redirect('/login');
  }
};

module.exports = {
  isLoggedIn
}