const Customer = require('../models/Customer');
const mongoose = require('mongoose');





exports.customerPageView  = async (req,res)=>{

    const locals = {
        title: 'Data Customer',
        description: 'Data Customer of IS Selling'
    }
    let perPage = 12;
    let page = req.query.page || 1;

    try {
        const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        // Count is deprecated. Use countDocuments({}) or estimatedDocumentCount()
        // const count = await Customer.count();
        const count = await Customer.countDocuments({});

        const message = await req.flash('info');
        const message_edit = await req.flash('editInfo')
        res.render('data_customer',{
            locals,
            message,

            customers,
            current : page,
            pages: Math.ceil(count / perPage),
        });
    } catch (error) {
        console.log(error);
    }
};


// exports.customerPageView  = async (req,res)=>{

//     const locals = {
//         title: 'Data Customer',
//         description: 'Data Customer of IS Selling'
//     }


//     try {
//         //get data.
//         const customers = await Customer.find({}).limit(22);

//         const message = await req.flash('info');
//         res.render('data_customer',{
//             locals,
//             message,
//             customers
//         });
//     } catch (error) {
//         console.log(error);
//     }
// };


/*
    *GET /
    *New Customer Form  
*/

exports.addCustomer = async (req,res)=>{
    res.render('add_customer');
}


/*
    *POST /
    *POST New Customer Form  
*/

exports.postCustomer = async (req,res)=>{

    // console.log(req.body);

    const newCustomer= new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        details: req.body.details,
        tel: req.body.tel,
        email: req.body.email,
    });

    try {
        await Customer.create(newCustomer);
        // res.render('add_customer');

        await req.flash('info', 'Kostumer baru telah ditambahkan.');
        res.redirect('/mdERQU0pnVpHd08ifQ/adm/data_customer'); //back to data_customer.
    } catch (error) {
        console.log(error);
    }
}

exports.detailCustomer = async (req,res)=>{
    try{
        const customer = await Customer.findOne({_id:req.params.id})
        res.render('detail_customer',{
            customer
        });
    }
    catch(error){
    }
}

exports.editCustomer = async (req,res)=>{
    try{
        const customer = await Customer.findOne({_id:req.params.id})
        res.render('edit_customer',{
            customer
        });
    }
    catch(error){
    }
}



exports.postEditCustomer = async (req,res)=>{


    try {
        await Customer.findOneAndUpdate({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            details: req.body.details,
            tel: req.body.tel,
            email: req.body.email,
            updateAt : Date.now()
        }).where(req.params.id);

        
        res.redirect('/mdERQU0pnVpHd08ifQ/adm/data_customer');
    } catch (error) {
        console.log(error);
    }
};

exports.deleteCustomer = async(req,res)=>{
    try {
        await Customer.deleteOne({_id:req.params.id});



        res.redirect('/mdERQU0pnVpHd08ifQ/adm/data_customer')

    } catch (error) {
        console.log(error);
    }
}

exports.searchCustomer = async (req,res) =>{
    try {
        let searchTerm = req.body.searchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const customers = await Customer.find({
            $or:[
                {firstName: {$regex: new RegExp(searchNoSpecialChar, "i")}},
                {lastName: {$regex: new RegExp(searchNoSpecialChar, "i")}}
            ]
        });

        res.render('data_customer',{
            customers
        })
    } catch (error) {
        
    }
}