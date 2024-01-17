require('dotenv').config();
const express = require('express');

// const {flash} = require('express-flash-message')
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const connectDB = require('./config/db');


const app = express();
const PORT = process.env.PORT;
const customerRouter = require('./router/customer');


connectDB();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


app.use(express.static(__dirname + "/public"));

// Express Session
app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
      }
    })
);


// Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }));



app.set("views",[
    path.join(__dirname, "/views"),
    path.join(__dirname, "/views/customers"),
])


app.set('view engine', 'ejs');

app.use('/', customerRouter);

app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`);
});