require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const cors = require('cors')
const redis = require('redis')
const RedisStore = require("connect-redis").default
const nocache = require('nocache'); // Import nocache middleware
const connectDB = require('./config/db');
const { isLoggedIn } = require('./auth/protect');
const path = require('path');

const client = redis.createClient({
  password: process.env.REDIS_PASS,
  socket: { 
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  }
});
(async () => { await client.connect(); })()

const app = express();
const PORT = process.env.PORT;
const customerRouter = require('./router/customer');
const bookRouter = require('./router/book');
const loginRouter = require('./router/login');
const dashboardRouter = require('./router/dashboard');

const userRouter = require('./router/mainUser');

connectDB();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


app.use(express.static(__dirname + "/public"));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.set('trust proxy', true)

// Express Session
app.use(
  session({
    proxy: true,
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    name: 'LitlaneBook',
    store: new RedisStore({ 
      client: client,
      ttl: 3600, // waktu kadaluwarsa dalam detik (misalnya 1 jam)
    
    
    }),
  
    
  })
);

app.use(cors({ credentials: true, origin: '*' }))



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

// app.use('/', dashboardRouter);

// nocache middleware untuk mencegah caching halaman yang memerlukan otentikasi
app.use('/', loginRouter);
// app.use('/', dashboardRouter, isLoggedIn, nocache(), (req, res, next) => {
//   next();
// });

app.use('/', dashboardRouter);

app.use('/', customerRouter);
app.use('/', bookRouter);
app.use('/', userRouter)








app.set("views", [
  path.join(__dirname, "/views"),
  path.join(__dirname, "/views/customers"),
  path.join(__dirname, "/views/books"),
  path.join(__dirname, "/views/users"),
])




app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});