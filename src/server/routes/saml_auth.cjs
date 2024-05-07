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
 * @memberof module:routers/login~loginRouter
 */
router.post('/',
    passport.authenticate('samlStrategy', { failureRedirect: './', failureMessage: true })
    // function (req, res) {
    //     res.cookie('jwt', req.user.token, { httpOnly: false });
    //     res.redirect('/');
    // }
);

/**
 * Route to deal with login callback
 * @name get/callback
 * @function
 * @memberof module:routers/login~loginRouter
 */
router.post('/callback',
    passport.authenticate('samlStrategy'),
    function (req, res, next) {
        next();
    },
    function (req, res) {
        res.cookie('jwt', req.user.token, { httpOnly: false });
        res.redirect('/');
    }
);
module.exports = router;