const express = require('express');
const passport = require('passport');


const router = express.Router();

/// LOGIN ROUTES ///
router.post('/',
    passport.authenticate('samlStrategy', { failureRedirect: './', failureMessage: true }),
    function (req, res) {
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
        console.log('-----------------------------');
        console.log('login call back dumps');
        console.log(req.user);
        console.log('-----------------------------');
        res.redirect('/');
    }
);

module.exports = router;