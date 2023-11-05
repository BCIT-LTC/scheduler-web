/** Express router providing user and login related routes
 * @module routers/users
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
 * @namespace faqRouter
 */
const router = express.Router();
const callAPI = require("../services/API_caller");

/**
 * Route to get all annoucements
 * @name get/faq
 * @function
 * @memberof module:routers/faq~faqRouter
 * @inner
 * @return {Object} array of all faq
 */
router.get("/faq", async (req, res) => {
  let response = await callAPI("faq", "GET", req);
  res.status(response.status).json(response.data);
});

/**
 * Route to create faq
 * @name post/faq
 * @function
 * @memberof module:routers/faq~faqRouter
 * @inner
 * @param {string} req.body.question - The question of the faq
 * @param {string} req.body.answer - The answer of the faq
 * @returns {Object} - The faq object that was added
 * @throws {Object} - Returns an error object if there was an issue adding the faq
 */
router.post("/faq", async (req, res) => {
  let response = await callAPI("faq", "POST", req);
  res.status(response.status).json(response.data);
});

/**
 * Route to delete faq
 * @name delete/faq
 * @function
 * @memberof module:routers/faq~faqRouter
 * @inner
 * @param {string} req.body.id - The id of the faq
 * @returns {Object} - Success or error message
 * @throws {Object} - Returns an error object if there was an issue deleting the faq
 */
router.delete("/faq", async (req, res) => {
  let response = await callAPI("faq", "DELETE", req);
  res.status(response.status).json(response.data);
});

/**
 * Route to edit faq
 * @name put/annoucement
 * @function
 * @memberof module:routers/faq~faqRouter
 * @inner
 * @param {string} req.body.id - The id of the faq
 * @param {string} req.body.title - The title of the faq
 * @param {string} req.body.description - The description of the faq
 * @returns {Object} - Success or error message
 * @throws {Object} - Returns an error object if there was an issue editing the faq
 */
router.put("/faq", async (req, res) => {
  let response = await callAPI("faq", "PUT", req);
  res.status(response.status).json(response.data);
});

module.exports = router;
