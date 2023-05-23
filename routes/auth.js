/** Express router providing user and login related routes
 * @module routers/users
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
 * @namespace usersRouter
 */
const router = express.Router();
const callAPI = require("../helpers/API_caller");

/**
 * Route to make sure the API db is storing the user
 * @name get/login
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @return {Object} boolean of if the user is admin
 */
router.get("/login", async (req, res) => {
    let response = await callAPI("login", "GET", req);
    res.status(response.status).json(response.data);
});

/**
 * Delete cookies
 * @name get/logout
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @return {} 200 if true
 */
router.post("/logout", async (req, res) => {
    // Get all cookies
    const cookies = Object.keys(req.cookies);

    // Iterate through each cookie and set its expiration date in the past
    cookies.forEach(cookie => {
        res.clearCookie(cookie);
    });

    // Send a response to indicate the cookies have been unset
    res.sendStatus(200);
});

/**
 * Route to make sure the API db is storing the user
 * @name get/admin
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @return {Object} list of all active admins
 */
router.get("/admin", async (req, res) => {
    let response = await callAPI("admin", "GET", req);
    res.status(response.status).json(response.data);
});

/**
 * Route to update an admin
 * @name get/admin
 * @function
 * @memberof module:routers/calendar~calendarRouter
 * @inner
 * @param {Object} req.body.email - email of user to update
 * @param {Object} req.body.isAdmin - new admin status
 * @return {Object} error, if there is one
 */
router.post("/admin", async (req, res) => {
    let response = await callAPI("admin", "POST", req);
    res.status(response.status).json(response.data);
});
module.exports = router;

