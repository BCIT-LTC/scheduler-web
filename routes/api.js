const express = require("express");

const router = express.Router();
const ApiRequests = require("../services/api_requests");

router.all("/*", async (req, res) => {
  console.log("Accessing the API...");

  const api_requests = new ApiRequests(
    req.path,
    req.headers.authorization,
    req.method,
    req.body
  );

  try {
    let data = api_requests.all();
    console.log("Data: ", data);
    res.status(data.status).json(data);
  } catch (error) {
    console.log("Error in API call: ", error);
    return error;
  }
});

module.exports = router;
