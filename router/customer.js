const express = require('express');
const router = express.Router();
const {dashboardPage, addCustomer, postCustomer, customerPageView, detailCustomer,editCustomer,postEditCustomer, deleteCustomer, searchCustomer} = require('../controllers/customerControllers');


const {checkAuth} = require('../auth/protect');

router.get('/dashboardUser', checkAuth,dashboardPage);
router.get('/data_customer',checkAuth,customerPageView );
router.get('/add_customer', checkAuth,addCustomer);
router.post('/post_costumer',checkAuth,postCustomer);

router.get('/detail_customer/:id',checkAuth,detailCustomer);

router.get('/edit_customer/:id',editCustomer)
router.put('/edit_customer/:id',postEditCustomer);

router.delete('/delete_customer/:id', deleteCustomer);

router.post('/search_customer',searchCustomer)


// Route to destroy the session (logout)
router.get('/logout', (req, res) => {
    // Destroy the session
    req.session.destroy(err => {
        if (err) {
            console.error('Error destroying session:', err);
            // Handle the error if needed
        } else {
            // Redirect to the login page after destroying the session
            res.redirect('/login');
        }
    });
});

module.exports = router;