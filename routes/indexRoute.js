require('dotenv').config();
const express = require('express');
const router = express.Router();
const path = require('path');
const jwt = require("jsonwebtoken");
const logger = require("../logger")(module);

/**
 * Route to serve the client application. Upon landing on the index route, the client is assigned a default JWT token.
 * @name get/*
 * @function
 * @memberof module:routers/mainRouter~router
 * @inner
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 *
 * @returns {Object} - The client application HTML file with a default JWT token in a cookie
 */
router.get('*', (req, res) => {

  logger.info("Serving client application");
  
  try {
    let default_jwt_token = jwt.sign({
      authorization_checked: false,
      is_logged_in: false
    }, process.env.JWT_AUTH_SIGNING_KEY);

    logger.info("Default JWT token: ");
    logger.info(default_jwt_token);
    
    res.cookie('default_jwt', default_jwt_token, { httpOnly: false, sameSite: 'none', secure: false });
  } catch (error) {
    logger.error("Error retrieving anonymous token: " + error.message);
    return res.status(500).json({ error: "Error retrieving anonymous token: " + error.message });
  }

  // Resolves the absolute path to the client application's HTML file
  res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

module.exports = router;
