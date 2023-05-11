const express = require('express');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

const LOCAL_PASSWORD = process.env.LOCAL_PASSWORD;
const LOCAL_USER = process.env.LOCAL_USER;

router.post('/', function (req, res) {
    if (req.body.email === LOCAL_USER && req.body.password === LOCAL_PASSWORD) {
        let email = req.body.email;
        let firstname = 'admin';
        let lastname = 'admin';
        let isAdmin = true;
        let jwtToken = jwt.sign({ email, firstname, lastname, isAdmin }, process.env.SECRET_KEY);
        res.cookie('jwt', jwtToken, { httpOnly: false });
        res.sendStatus(200);
    } else {
        return res.sendStatus(401);
    }
});

module.exports = router;