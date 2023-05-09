const express = require('express');
const passport = require('passport');
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();
const LOCAL_PASSWORD = process.env.LOCAL_PASSWORD;
const LOCAL_USER = process.env.LOCAL_USER;

/// LOGIN ROUTES ///
router.post('/',
    passport.authenticate('samlStrategy', { failureRedirect: './', failureMessage: true }),
    function (req, res) {
        res.cookie('jwt', req.user.token, { httpOnly: false });
        console.log(`test redirect baseurl`)
        console.log(req.originalUrl)
        console.log(req.baseUrl)
        console.log(req.url)
        console.log(req.headers)
        console.log(req.path)
        console.log(req.hostname)
        res.redirect('/');
    });

router.post('/callback',
    function (req, res, next) {
        console.log('-----------------------------');
        console.log('/Start login callback ');
        next();
    },
    passport.authenticate('samlStrategy'),
    function (req, res) {
        res.cookie('jwt', req.user.token, { httpOnly: false });
        console.log('-----------------------------');
        console.log('login call back dumps');
        console.log(req.user);
        console.log('-----------------------------');
        res.redirect('/');
    }
);

router.post('/local', function (req, res) {
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