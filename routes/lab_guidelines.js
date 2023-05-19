
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
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage })
const axios = require('axios');
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
router.post('/labGuidelines', upload.single('pdfFile'), async (req, res) => {
  try {
    const file = req.file;
    const endpoint = process.env.API_URL + 'labGuidelines';
    const blob = new Blob([file.buffer], { type: file.mimetype });
    const formData = new FormData();
    formData.append('pdfFile', blob, file.originalname);
    const response = await axios.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: req.headers.authorization,
      }
    });
    res.status(200).send(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


/**
 * Route to get calendar details for a specific month
 * @name get/labGuidelines
 * @function
 * @memberof module:routers/labGuidelines~labGuidelinesRouter
 * @inner
 * @return {Object} lab guidelines pdf
 */
router.get("/labGuidelines", async function (req, res) {
  let response = await fetch(
    process.env.API_URL + 'labGuidelines', {
    method: "GET",
    headers: {
      'Authorization': req.headers.authorization,
    }
  }
  );
  let data = await response.blob();
  res.status(response.status);
  res.type(data.type)
  data.arrayBuffer().then((buf) => {
    res.send(Buffer.from(buf))
  });
});


module.exports = router