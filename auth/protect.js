const isLoggedIn = (req, res, next) => {
    const { id_verifikator } = req.session;
  
    if (id_verifikator) {
      // Pengguna sudah login, lanjutkan ke halaman yang diminta
      next();
    } else {
      // Pengguna belum login, redirect ke halaman login atau halaman yang ditentukan
      const redirectUrl = req.query.redirect || "/login-pertamina";
      res.redirect(redirectUrl);
    }
  };
  
  module.exports = {
    isLoggedIn,
  };