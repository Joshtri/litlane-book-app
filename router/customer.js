const express = require('express');
const router = express.Router();
const {dashboardPage, addCustomer, postCustomer, customerPageView, detailCustomer,editCustomer,postEditCustomer, deleteCustomer, searchCustomer} = require('../controllers/customerControllers');



router.get('/', dashboardPage);
router.get('/data_customer',customerPageView );
router.get('/add_customer', addCustomer);
router.post('/post_costumer', postCustomer);

router.get('/detail_customer/:id',detailCustomer);

router.get('/edit_customer/:id',editCustomer)
router.put('/edit_customer/:id',postEditCustomer);

router.delete('/delete_customer/:id', deleteCustomer);

router.post('/search_customer',searchCustomer)

module.exports = router;