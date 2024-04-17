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

/**
 * Route to get SAML login page
 * @name get/login
 * @function
 * @memberof module:routers/login~loginrRouter
 */
router.post('/',
    passport.authenticate('samlStrategy', { failureRedirect: './', failureMessage: true }),
    function (req, res) {
        console.log(" initial login");
        res.cookie('jwt', req.user.token, { httpOnly: false });
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
        console.log(" callback ");
        console.log(req.body);
        next();
    },
    passport.authenticate('samlStrategy'),
    function (req, res) {
        console.log(" callback saml login");
        res.cookie('jwt', req.user.token, { httpOnly: false });
        res.redirect('/');
    }
);
module.exports = router;