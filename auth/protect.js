const isLoggedIn = (req, res, next) => {
    const { id_admin } = req.session;
  
    if (id_admin) {
      // Pengguna sudah login, lanjutkan ke halaman yang diminta
      next();
    } else {
      // Pengguna belum login, redirect ke halaman login atau halaman yang ditentukan
      const redirectUrl = req.query.redirect || "/";
      res.redirect(redirectUrl);
    }
  };
  
  module.exports = {
    isLoggedIn,
  };