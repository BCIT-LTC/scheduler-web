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
// const issuer = require('openid-client')

/**
 * Route to openid Login page
 * @name get/login
 * @function
 * @memberof module:routers/login~loginRouter
 */
// router.get('/',
//     passport.authenticate('oidcStrategy', { failureRedirect: './', failureMessage: true }),
//     function (req, res) {
//         console.log("login route")
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

router.get('/', passport.authenticate('oidcStrategy'));

// router.get('/',
//   passport.authenticate('oidcStrategy', { failureRedirect: '/', failureMessage: false }),
//   function(req, res) {
//     console.log("login ")

//   });

/**
 * Route to deal with login callback
 * @name get/callback
 * @function
 * @memberof module:routers/login~loginRouter
 */
// router.get('/callback',
// function (req, res, next) {
//     console.log('-----------------------------');
//     console.log('/Start login callback ');
//     next();
// },

router.get('/callback',
  // passport.authenticate('oidcStrategy', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    console.log("callback ")
    res.redirect('/');
  });
// passport.authenticate('oidcStrategy'),
// function (req, res) {
//     console.log(req.user.token);
//     res.cookie('jwt', req.user.token, { httpOnly: true });
//     console.log('-----------------------------');
//     console.log('login call back dumps');
//     console.log(req.user);
//     console.log('-----------------------------');
//     res.redirect('/');
// }
// );

module.exports = router;