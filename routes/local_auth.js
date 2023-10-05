/** Express router providing local login routes
 * @module routers/locallogin
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
 * @namespace localloginrRouter
 */
const router = express.Router();

const jwt = require("jsonwebtoken");
require("dotenv").config();

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;


/**
 * Login using a local account
 * @name post/locallogin
 * @function
 * @memberof module:routers/locallogin~localloginRouter
 * @inner
 * @param {Object} req.body.email - username
 * @param {Object} req.body.password - password for given username
 * @return {Object} JWT cookie if success
 */
router.post('/', function (req, res) {
    if (req.body.email === ADMIN_USERNAME && req.body.password === ADMIN_PASSWORD) {
        let email = req.body.email;
        let firstname = 'admin';
        let lastname = 'admin';
        let jwtToken = jwt.sign({ email, firstname, lastname, isAdmin: true, isLocal: true }, process.env.JWT_AUTH_SIGNING_KEY);
        res.cookie('jwt', jwtToken, { httpOnly: false });
        res.sendStatus(200);
    } else {
        return res.sendStatus(401);
    }
});

module.exports = router;