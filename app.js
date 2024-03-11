/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

require("dotenv").config();
const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 9000;
const hostname = "0.0.0.0";
const cookieParser = require("cookie-parser");

const logger = require("./logger")(module);

const logout = require("./routes/logout");
const check_authorization = require("./routes/check_authorization");
const api = require("./routes/api");
const indexRoute = require("./routes/indexRoute");
const saml_auth = require("./routes/saml_auth");
// const announcements = require("./routes/announcements");
// const users = require("./routes/users");

const passport = require("./middleware/passport");
const authentication_check = require("./middleware/authentication_check");
const app = express();
app.use((req, res, next) => {
  logger.info(`Received a ${req.method} request on ${req.url}`);
  next();
});
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

app.use("/auth/authorize", check_authorization);

app.use("/api", authentication_check, api);

app.use("/logout", logout);
app.use("/*", indexRoute);

app.listen(port, hostname, () => {
  // console.log(`Server on port ${port}`);
  logger.info(`Server on port ${port}`);
});
