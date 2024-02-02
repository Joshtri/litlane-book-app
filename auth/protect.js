// auth/protect.js
const isLoggedIn = (req, res, next) => {
  const { userId, username } = req.session;

  console.log('userId:', userId);
  console.log('username:', username);

  if (userId && username) {
    req.user = { userId, username };
    return next();
  } else {
    console.log('Redirecting to login due to authentication failure.');
    req.flash('error', 'Anda harus login untuk mengakses halaman ini.');
    return res.redirect('/login');
  }
};

module.exports = { isLoggedIn };
