const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const helmet = require('helmet');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./config/database.js');
const User = require('./models/user');
const userRouter = require('./route/user.route');
const itemRouter = require('./route/item.route');
const orderRouter = require('./route/order.route');
const permission = require('permission');
const nodemailer = require('nodemailer');
/* const request = require('then-request'); */

const logDirectory = path.join(__dirname, 'log');
const port = process.env.PORT || 8080;
const app = express();

// Logging
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory,
});
app.use(morgan('combined', {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400,
}));

// Security
app.use(helmet());

// // Product pictures folder
// app.use('/uploads', express.static('uploads'));

// Body Parse middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// Session handling
app.use(session({
  secret: 'CraneCrew secret string: just do it!!',
  resave: true,
  httpOnly: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // seconds which equals 1 week
  },
}));

// Passport - Auth
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to MongoDB
mongoose.connect(db.uri, db.options)
  .then(() => { console.log('MongoDB connected.'); })
  .catch((err) => { console.error(`MongoDB error.:${err}`); });

// Enable CORS
app.use(cors({
  credentials: true,
  origin: 'http://localhost:4200',
}));

// User User router
app.use('/user/', userRouter);
app.use('/item/', itemRouter);
app.use('/order/', orderRouter);

/**
 * Use public folder for images
 */
app.use(express.static('public'));
app.get('/img/:img', (req, res) => {
  if (req.params.img) {
    res.sendFile(path.join(__dirname, '/public/img/', req.params.img));
  }
});

app.post('/sendemail', (req, res) => {
  const mailadr = req.body;
  console.log(mailadr);
  // mailadr.from = 'cranecrew.zsiga@gmail.com';
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'cranecrew.zsiga@gmail.com',
      pass: 'Cc012345',
    },
  });
  const mailOptions = {
    from: mailadr.from,
    to: 'cranecrew.zsiga@gmail.com',
    subject: mailadr.subject,
    text: mailadr.body,
    html: '<b>Testing email function</b>',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.render('index');
  });
});

// Start server
app.listen(port);
