const express = require("express");

const router = express.Router();
const ApiRequests = require("../services/api_requests.cjs");

/**
 * Express router for handling API requests.
 * @typedef {import('express').Router} ExpressRouter
 */

/**
 * @type {ExpressRouter}
 * @namespace apiRouter
 * @description Router for handling API requests.
 */

/**
 * Middleware for handling all API requests.
 * @name apiRouter.all
 * @function
 * @memberof apiRouter
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @returns {Promise<any>} - The response data from the API call.
 */
router.all("/*", async (req, res) => {
  console.log("Accessing the API...");

  const api_requests = new ApiRequests(
    req.originalUrl,
    req.headers.authorization,
    req.method,
    req.body
  );

  try {
    let data = await api_requests.all();
    // console.log("Data: ", data)
    res.status(200).send(data);
  } catch (error) {
    // console.log("Error in API call: ", error);
    return error;
  }
});

module.exports = router;
