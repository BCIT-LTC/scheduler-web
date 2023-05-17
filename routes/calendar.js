/** Express router providing calendar related routes
 * @module routers/calendar
 * @requires express
 */

/**
 * express module
 * @const
 */
const express = require("express");

/**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 * @namespace calendarRouter
 */
const router = express.Router();

const callAPI = require("../helpers/API_caller");

/**
 * Route to get calendar details for a specific month
 * @name get/calendar
 * @function
 * @memberof module:routers/calendar~calendarRouter
 * @inner
 * @param {int} month - Month to get data for
 * @return {Object} data of month requested
 */
router.get("/calendar", async function (req, res) {
    let response = await callAPI("calendar", "GET", req, {
        month: req.query.month,
    });
    res.status(response.status).json(response.data);
});

/**
 * Route to create calendar event
 * @name post/calendar
 * @function
 * @memberof module:routers/calendar~calendarRouter
 * @inner
 * @param {Object} req.body.forms - an array of date, start-time, end-time, facilitator, room, and if its a stat.
 * @returns {Object} - The added events
 * @throws {Object} - Returns an error object if there was an issue adding the announcement
 */
router.post("/calendar", async function (req, res) {
    let response = await callAPI("calendar", "POST", req);
    res.status(response.status).json(response.data);
});

/**
 * Route to update calendar event
 * @name post/openlab
 * @function
 * @memberof module:routers/calendar~calendarRouter
 * @inner
 * @param {Object} req.body.forms - an array of one object, having date, start-time, end-time, facilitator, room, and if its a stat.
 * @returns {Object} - The edited events
 * @throws {Object} - Returns an error object if there was an issue adding the announcement
 */
router.post("/openlab", async function (req, res) {
    let response = await callAPI("calendar", "POST", req);
    res.status(response.status).json(response.data);
});

module.exports = router;
