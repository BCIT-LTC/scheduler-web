/** Express router providing authorization related routes
 * @module routers/authorization
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require('express');

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
router.get("", async (req, res) => {
    let status;
    let data;
    let response;
    const url = new URL(process.env.API_URL + "/");
    try {
        response = await fetch(url, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': req.headers.authorization,
            }
        });
        console.log("check_authorization.js: response: ", response.status);
        if (response.status !== 200) {
            throw new Error("Authorization failed due to error in API call");
        }
        data = await response.json();
        status = response.status;
    } catch (error) {
        console.log(error.message);
        status = 500; //server error
        data = { error: "API ERROR: " + error.message};
    }
    console.log("check_authorization.js: req.body: ", req.body);
    console.log("check_authorization.js: data: ", data);
    res.status(status).json(data);
    // res.status(200).json({ role: "admin" });
});


module.exports = router;

