require('dotenv').config();
const express = require('express');
const router = express.Router();
const path = require('path');

/**
 * Route to serve the client application
 * @name get/*
 * @function
 * @memberof module:routers/mainRouter~router
 * @inner
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 *
 * @returns {Object} - The client application HTML file
 */
router.get('*', (req, res) => {
  // Resolves the absolute path to the client application's HTML file
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

module.exports = router;
