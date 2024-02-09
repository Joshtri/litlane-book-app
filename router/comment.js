const express = require('express');
const router = express.Router();
const { commentsPageView, deleteComment} = require('../controllers/commentController');


const {isLoggedIn} = require('../auth/protect');

// router.get('/dashboardUser', isLoggedIn,dashboardPage);

router.get('/data_comment',isLoggedIn,commentsPageView);
router.delete('/delete_comment/:id', isLoggedIn, deleteComment);
// router.get('/add_customer', isLoggedIn,addCustomer);
// router.post('/post_costumer',isLoggedIn,postCustomer);



// router.get('/detail_customer/:id',isLoggedIn,detailCustomer);

// router.get('/edit_customer/:id',isLoggedIn,editCustomer)
// router.put('/edit_customer/:id', isLoggedIn,postEditCustomer);


// router.post('/search_customer',searchCustomer)


// Route to destroy the session (logout)
// router.get('/logout', (req, res) => {
//     // Destroy the session
//     req.session.destroy(err => {
//         if (err) {
//             console.error('Error destroying session:', err);
//             // Handle the error if ne   eded
//         } else {
//             // Redirect to the login page after destroying the session
//             res.redirect('/login');
//         }
//     });
// });

module.exports = router;