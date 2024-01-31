// Middleware to check if the user is authenticated
const checkAuth = (req, res, next) => {
  if (req.session.adminId) {
      // User is authenticated, proceed to the next middleware or route handler
      next();
  } else {
      // User is not authenticated, redirect to the login page
      res.redirect('/login');
  }
};
  module.exports = {
    checkAuth,
  };