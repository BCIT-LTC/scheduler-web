/** Express router providing annoucement related routes
 * @module routers/announcement
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
 * @namespace announcementRouter
 */
const router = express.Router();
const callAPI = require("../helpers/API_caller");

/**
 * Route to get all annoucements
 * @name get/annoucement
 * @function
 * @memberof module:routers/announcement~announcementRouter
 * @inner
 * @return {Object} array of all annoucements
 */
router.get("/announcement", async (req, res) => {
  console.log("annoucnement")
  let response = await callAPI("announcement", "GET", req);
  res.status(response.status).json(response.data);
});

/**
 * Route to create announcement
 * @name post/annoucement
 * @function
 * @memberof module:routers/announcement~announcementRouter
 * @inner
 * @param {string} req.body.title - The title of the announcement
 * @param {string} req.body.description - The description of the announcement
 * @param {string} req.body.date - The date of the announcement in string format
 * @returns {Object} - The announcement object that was added
 * @throws {Object} - Returns an error object if there was an issue adding the announcement
 */
router.post("/announcement", async (req, res) => {
  let response = await callAPI("announcement", "POST", req);
  console.log("response details")
  console.log(response.status)
  // console.log(response.data)
  // if(response.status != 200){
  //   console.log(response.data)
  // }
  // res.status(response.status).json(response.data);
});

/**
 * Route to delete announcement
 * @name delete/annoucement
 * @function
 * @memberof module:routers/announcement~announcementRouter
 * @inner
 * @param {string} req.body.id - The id of the announcement
 * @returns {Object} - Success or error message
 * @throws {Object} - Returns an error object if there was an issue adding the announcement
 */
router.delete("/announcement", async (req, res) => {
  let response = await callAPI("announcement", "DELETE", req);
  res.status(response.status).json(response.data);
});

/**
 * Route to edit announcement
 * @name put/annoucement
 * @function
 * @memberof module:routers/announcement~announcementRouter
 * @inner
 * @param {string} req.body.id - The id of the announcement
 * @param {string} req.body.title - The title of the announcement
 * @param {string} req.body.description - The description of the announcement
 * @returns {Object} - Success or error message
 * @throws {Object} - Returns an error object if there was an issue adding the announcement
 */
router.put("/announcement", async (req, res) => {
  let response = await callAPI("announcement", "PUT", req);
  res.status(response.status).json(response.data);
});

module.exports = router;
