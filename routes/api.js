const express = require("express");

const router = express.Router();
const callAPI = require("../services/API_caller");

router.all("*", async (req, res) => {
  console.log("Accessing the API...");
  try {
    let response = callAPI(req.path, req.method, req);
    res.status(response.status).json(response.data);
  } catch (error) {
    console.log(error);
    return error;
  }
});

module.exports = router;
