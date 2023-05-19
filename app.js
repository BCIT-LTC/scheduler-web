const express = require('express');
// const session = require("express-session");
const rateLimit = require("express-rate-limit");
const cookieSession = require("cookie-session");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 9000;
const hostname = "0.0.0.0";

// const overrideMethod = require('method-override')

const app = express();
app.use(cors());
app.use(express.static("build"));
app.use(express.static("client/build"));
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
    secret: "cookies are gud 4 health",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const localLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const passport = require("./middleware/passport");
app.use(passport.initialize());
app.use(passport.session());

const indexRoute = require("./routes/indexRoute");
const saml_auth = require("./routes/saml_auth");
const local_auth = require("./routes/local_auth");
const announcements = require("./routes/announcements");
const login = require("./routes/auth");
const calendar = require("./routes/calendar");
const lab_guidelines = require("./routes/lab_guidelines");
const faq = require("./routes/faq");

// const { checkNotAuthenticated } = require("./middleware/checkAuth");
app.use(express.urlencoded({ extended: true }));
// app.use(overrideMethod('_method'))

app.use("/login", saml_auth);
app.use("/loginlocal", localLoginLimiter, local_auth);

app.use("/", announcements, login, calendar, faq, lab_guidelines);
app.use("/", indexRoute);


app.listen(port, hostname, () => {
  console.log(`Server on port ${port}`);
});
