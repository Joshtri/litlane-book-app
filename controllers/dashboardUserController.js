exports.dashboardPage = (req, res, next) => {
    // Check if req.user is defined to avoid TypeError
    if (!req.user) {
      // Handle the case when the user is not authenticated
      req.flash('error', 'Anda harus login untuk mengakses halaman ini.');
      return res.redirect('/login');
    }
    
  
    // Access user data stored in req.user
    const { userId, username } = req.user;
  
    const locals = {
      title: 'Dashboard',
      description: 'Main dashboard of IS Selling',
      userId: userId, // Adding session information to the locals object
      username: username
    };
  
    res.render('dashboard', {
      locals
    });
  };
