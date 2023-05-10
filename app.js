const express = require('express');
// const session = require("express-session");
const cookieSession = require('cookie-session');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 9000;
const hostname = '0.0.0.0';

// const overrideMethod = require('method-override')

const app = express();
app.use(cors());
app.use(express.static('build'));
app.use(express.static('client/build'));
app.use(bodyParser.json());

// app.use(
//   session({
//     secret: "secret_value",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       httpOnly: true,
//       secure: false,
//       maxAge: 24 * 60 * 60 * 1000,
//     },
//   })
// );

app.use(
  cookieSession({
    secret: 'cookies are gud 4 health',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require('./middleware/passport');
app.use(passport.initialize());
app.use(passport.session());

const indexRoute = require('./routes/indexRoute');
const authentication = require('./routes/authentication');
// const { checkNotAuthenticated } = require("./middleware/checkAuth");

app.use(express.urlencoded({extended: true}));
// app.use(overrideMethod('_method'))

app.use('/', indexRoute);
app.use('/login', authentication);

app.listen(port, hostname, () => {
  console.log(`Server on port ${port}`);
});
