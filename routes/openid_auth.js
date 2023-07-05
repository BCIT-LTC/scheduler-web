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
// import { Issuer } from 'openid-client';
const issuer = require('openid-client')

/**
 * Route to openid Login page
 * @name get/login
 * @function
 * @memberof module:routers/login~loginRouter
 */
// router.post('/',
//     passport.authenticate('samlStrategy', { failureRedirect: './', failureMessage: true }),
//     function (req, res) {
//         res.cookie('jwt', req.user.token, { httpOnly: false });
//         console.log(`test redirect baseurl`)
//         console.log(req.originalUrl)
//         console.log(req.baseUrl)
//         console.log(req.url)
//         console.log(req.headers)
//         console.log(req.path)
//         console.log(req.hostname)
//         res.redirect('/');
//     });
router.post("/", async (req, res) => {
    console.log("cehck check check")
    // console.log(issuer.Issuer)
    const googleIssuer = await issuer.Issuer.discover('http://vault.ltc.bcit.ca/v1/identity/oidc/provider/ltc-auth/.well-known/keys');
    console.log('Discovered issuer %s %O', googleIssuer.issuer, googleIssuer.metadata);
});

module.exports = router;