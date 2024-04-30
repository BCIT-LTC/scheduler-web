const express = require("express");

const router = express.Router();
const ApiRequests = require("../services/api_requests.cjs");


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
