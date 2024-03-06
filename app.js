/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cookieSession = require("cookie-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 9000;
const hostname = "0.0.0.0";
const cookieParser = require("cookie-parser");

const logger = require("./logger")(module);

const auth = require("./routes/auth");
const check_authorization = require("./routes/check_authorization");
const api = require("./routes/api");
const indexRoute = require("./routes/indexRoute");
const saml_auth = require("./routes/saml_auth");
const local_auth = require("./routes/local_auth");
// const announcements = require("./routes/announcements");
// const users = require("./routes/users");

const passport = require("./middleware/passport");
const authentication_check = require("./middleware/authentication_check");
const app = express();
app.use(cors());
app.use(express.static("client/build"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(
  cookieSession({
    secret: "cookies are gud 4 health",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
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

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true }));

// Define an API route for viewing the logs
app.get("/log/", (req, res) => {
  // Query the logger for the latest log entries
  logger.query({ order: "desc", limit: 100 }, (err, results) => {
    if (err) {
      // If an error occurs, send an
      // error response
      res.status(500).send({
        error: "Error retrieving logs",
      });
    } else {
      // If successful, send the log
      // entries as a response
      res.send(results);
    }
  });
});

app.use("/auth/login", saml_auth);
app.use("/auth/loginlocal", localLoginLimiter, local_auth);

app.use("/auth/authorize", check_authorization);

app.use("/api", authentication_check, api);

app.use("/logout", auth);
app.use("/*", indexRoute);

app.listen(port, hostname, () => {
  // console.log(`Server on port ${port}`);
  logger.info(`Server on port ${port}`);
});
