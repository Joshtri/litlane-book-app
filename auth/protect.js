// auth/protect.js
const isLoggedIn = (req, res, next) => {
  const { userId, username } = req.session;
  // console.log('isLoggedIn - Sesi saat ini:', { userId, username });

  if (userId && username) {
    req.user = { userId, username };
    return next();
  } else {
    req.flash('error', 'Anda harus login untuk mengakses halaman ini.');
    return res.redirect(`/${process.env.API_BASE_URL_LOG}`);
  }
};

module.exports = {
  isLoggedIn
}