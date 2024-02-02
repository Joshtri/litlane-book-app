require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const connectDB = require('./config/db');
const { isLoggedIn } = require('./auth/protect');
const path = require('path');


const app = express();
const PORT = process.env.PORT;
const customerRouter = require('./router/customer');
const bookRouter = require('./router/book');
const loginRouter = require('./router/login');

const userRouter = require('./router/mainUser');

connectDB();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


app.use(express.static(__dirname + "/public"));


app.use('/uploads',express.static(path.join(__dirname,'uploads')));
// Express Session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge : 360000,  // Waktu kadaluarsa dalam milidetik (6 menit)
        // secure : true,
      }
    })
);

// app.use(
//   session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true,
//     cookie: {
//       maxAge: 360000,  // Waktu kadaluarsa dalam milidetik (6 menit)
//       secure: true,   // Hanya mengirim cookie melalui HTTPS
//       // sameSite: 'none', // Sesuaikan sesuai kebutuhan keamanan
//       // Jika Anda menggunakan subdomain, sesuaikan domain sesuai kebutuhan
//       // domain: 'yourdomain.com'
//       // httpOnly: false
//     },
//   })
// );
// Flash Messages
// Middleware checkAuth ditempatkan setelah express-session
// app.use(isLoggedIn);
app.use(flash({ sessionKeyName: 'flashMessage' }));

app.set('view engine', 'ejs');

app.use('/', customerRouter);
app.use('/', bookRouter);
app.use('/', loginRouter);
app.use('/', userRouter)








app.set("views",[
    path.join(__dirname, "/views"),
    path.join(__dirname, "/views/customers"),
    path.join(__dirname, "/views/books"),
    path.join(__dirname, "/views/users"),
])




app.listen(PORT,()=>{
    console.log(`server started at http://localhost:${PORT}`);
});