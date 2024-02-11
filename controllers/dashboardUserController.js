const Book = require('../models/Book');
const Comment = require('../models/Comment');


exports.dashboardPage = async(req, res, next) => {
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
  

  const messageINFOupdate = await req.flash('infoLanjut');
  const messageNotifLogin = await req.flash('successLogin'); 

  res.render('dashboard', {
    locals,
    messageINFOupdate,
    messageNotifLogin
  });
};


exports.totalBooksJSON = async (req, res) => {
  try {
      const totalBooks = await Book.countDocuments();
      res.json(totalBooks);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.totalCommentJSON = async (req, res) => {
  try {
      const totalComments = await Comment.countDocuments();
      res.json(totalComments);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};