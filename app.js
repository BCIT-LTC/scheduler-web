const express = require("express");
const session = require("express-session");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 9000;
// const overrideMethod = require('method-override')

const app = express();
app.use(express.static('build'))
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('client/build'));

app.use(
  session({
    secret: "secret_value",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// const passport = require("./middleware/passport");
const indexRoute = require("./routes/indexRoute");
// const { checkNotAuthenticated } = require("./middleware/checkAuth");

app.use(express.urlencoded({ extended: true }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(overrideMethod('_method'))


app.use("/", indexRoute);



app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
