/** Express router providing authorization related routes
 * @module routers/authorization
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require('express');
const { connect } = require('./indexRoute');
const jwt = require("jsonwebtoken");

/**
 * Express router to mount authorization related functions on.
 * @type {object}
 * @const
 * @namespace usersRouter
 */
const router = express.Router();

/**
 * Route to make sure the API db is storing the user
 * @name get/auth/authorize
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @return {Object} boolean of if the user is admin
 */
router.post("", async (req, res, next) => {

    let response;
    const url = new URL(process.env.API_URL + "authorize");
    try {
        response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization,
            }
        });

        response.json().then((data) => {
            if (response.status === 200) {
                let email = data.email
                let first_name = data.first_name
                let last_name = data.last_name
                let role = data.role
                let school = data.school
                let program = data.program
                let jwtToken = jwt.sign({
                    email,
                    first_name,
                    last_name,
                    role,
                    school,
                    program,
                    authorization_checked: true,
                    is_logged_in: true
                }, process.env.JWT_AUTH_SIGNING_KEY);

                res.cookie('jwt', jwtToken, { httpOnly: false, sameSite: 'none', secure: true });
                res.redirect('/');
            }
            else {
                throw {
                    http_code: response.status,
                    msg: data.error,
                };
            }
        }).catch((error) => {
            switch (error.http_code) {
                case 400:
                    return res.status(400).json({ error: "Bad request sent to API: " + error.msg });
                case 500:
                    return res.status(500).json({ error: "API cannot perform the request: " + error.msg });
                default:
                    return res.status(400).json({ error: "Unknown error: " + error.msg });
            }
        });
    } catch (error) {
        return res.status(500).json({ error: "API unreachable: " + error.message });
    }
});

module.exports = router;

