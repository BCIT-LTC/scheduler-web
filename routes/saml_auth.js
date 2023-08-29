/** Express router providing saml login routes
 * @module routers/login
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require('express');

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace loginRouter
 */
const router = express.Router();
const passport = require('passport');
require("dotenv").config();


/**
 * Route to get SAML login page
 * @name get/login
 * @function
 * @memberof module:routers/login~loginrRouter
 */
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

/**
 * Route to deal with login callback
 * @name get/callback
 * @function
 * @memberof module:routers/login~loginRouter
 */
router.post('/callback',
    function (req, res, next) {
        console.log('-----------------------------');
        console.log('/Start login callback ');
        console.log(req)
        console.log("res")
        console.log(res)
        next();
    },
    passport.authenticate('samlStrategy'),
    function (req, res) {
        console.log(req.user.token);
        res.cookie('jwt', req.user.token, { httpOnly: false });
        console.log('-----------------------------');
        console.log('login call back dumps');
        console.log(req.user);
        console.log('-----------------------------');
        res.redirect('/');
    }
);
module.exports = router;