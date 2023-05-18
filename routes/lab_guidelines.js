/** Express router providing labGuidelines related routes
 * @module routers/labGuidelines
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
 * @namespace labGuidelinesRouter
 */
const router = express.Router();

const callAPI = require("../helpers/API_caller");

/**
 * Route to create labGuidelines event
 * @name post/labGuidelines
 * @function
 * @memberof module:routers/labGuidelines~labGuidelinesRouter
 * @inner
 * @param {Object} req.body.forms - an array of date, start-time, end-time, facilitator, room, and if its a stat.
 * @returns {Object} - The added events
 * @throws {Object} - Returns an error object if there was an issue adding the announcement
 */
router.post("/labGuidelines", async function (req, res) {
  console.log(req.body);
  let response = await callAPI("labGuidelines", "POST", req);
  res.status(response.status).json(response.data);
});

module.exports = router