const express = require('express');
const router = express.Router();

// Placeholder variable to store the contact message
let contactMessage =
  'For any questions related to the Open Lab Application or general use of Open Lab, please contact jasica_munday@BCIT.ca. For any other inquiries (e.g. clinical skills) please contact your clinical instructor.';

/**
 * GET contact message
 * @name get/contact
 * @function
 * @memberof module:routers/contact~router
 * @inner
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 *
 * @returns {Object} - JSON object with the contact message
 */
router.get('/contact', (req, res) => {
  // Responds with the current contact message as JSON
  res.json({message: contactMessage});
});

/**
 * POST contact message
 * @name post/contact
 * @function
 * @memberof module:routers/contact~router
 * @inner
 *
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 *
 * @returns {Object} - JSON object with the success message
 */
router.post('/contact', (req, res) => {
  const {message} = req.body;

  // Update the contact message with the new message received in the request body
  contactMessage = message;

  // Responds with a JSON object indicating the success and a message
  res.json({success: true, message: 'Contact message updated successfully.'});
});

module.exports = router;
