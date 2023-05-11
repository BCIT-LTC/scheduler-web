
const express = require("express");
const router = express.Router();
const callAPI = require("../helpers/API_caller");

router.get("/announcement", async (req, res) => {
    let response = await callAPI("announcement", "GET", req);
    res.status(response.status).json(response.data);
});

//endpoint for adding or editing announcements
router.post("/announcement", async (req, res) => {
    let response = await callAPI("announcement", "POST", req);
    res.status(response.status).json(response.data);
});

//endpoint for deleting announcements
router.delete("/announcement", async (req, res) => {
    let response = await callAPI("announcement", "DELETE", req);
    res.status(response.status).json(response.data);
});


module.exports = router;