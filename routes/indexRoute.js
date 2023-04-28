const express = require("express");
const router = express.Router();
const {
  ensureAuthenticated,
  isAdmin,
  checkNotAuthenticated,
} = require("../middleware/checkAuth");
const passport = require("../middleware/passport");
const jwt = require("jsonwebtoken");
const path = require("path");
const updateForm = require("../models/openLabForm");
const {
  getAnnouncement,
  addAnnouncement,
  deleteAnnouncement,
} = require("../models/announcement");
const { saveLogoutTime, logoutTime } = require("../models/logoutTime");
require("dotenv").config();

function getUserToken(email) {
  return jwt.sign({ email }, process.env.SECRET_KEY);
}

router.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

router.post(
  "/api/login",
  passport.authenticate("local", {
    failureMessage: true,
  }),
  (req, res) => {
    console.log("req user", req.user, req.authInfo, req.params);
    const token = getUserToken(req.user.email);
    res
      .status(200)
      .json({ token, email: req.user.email, isAdmin: req.user.isAdmin });
    res.end();
  },
  (req, res) => {
    const logoutTime = logoutTime(req.user.email);
  }
);



router.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

module.exports = router;
