// auth/protect.js
const checkAuth = (req, res, next) => {
  console.log('adminId in session:', req.session.adminId);  // Log nilai adminId sebelum pengalihan
  console.log('Middleware checkAuth is running.');
  if (req.session.adminId) {
      // User is authenticated, proceed to the next middleware or route handler
      // next();
      res.redirect('/dashboardUser')
  } else {
      // User is not authenticated, redirect to the login page
      res.redirect('/login');
      console.log(req.session.adminId);
  }
};

module.exports = { checkAuth };
