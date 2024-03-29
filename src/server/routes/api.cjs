const express = require("express");

const router = express.Router();
const ApiRequests = require("../services/api_requests.cjs");

// router.get("/events", async (req, res) => {
//   try {
//     let data = await fetch("http://localhost:8000/api/events?start=2024-03-24T07%3A00%3A00.000Z&end=2024-03-31T07%3A00%3A00.000Z",
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `${req.headers.authorization}`,
//         },
      
//       });
//     console.log("Data: ", data);
//     res.status(data.status).json(data);
//   } catch (error) {
//     console.log("Error in API call: ", error);
//     return error;
//   }
// });

router.all("/*", async (req, res) => {
  console.log("Accessing the API...");

  const api_requests = new ApiRequests(
    req.originalUrl,
    req.headers.authorization,
    req.method,
    req.body
  );
  console.log("API Requests: ", api_requests);
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
