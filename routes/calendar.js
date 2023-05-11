
const express = require("express");
const router = express.Router();
const callAPI = require("../helpers/API_caller");


router.get("/calendar", async function (req, res) {
    let response = await callAPI("calendar", "GET", req, { month: req.query.month });
    res.status(response.status).json(response.data);
});

router.post("/calendar", async function (req, res) {
    let response = await callAPI("calendar", "POST", req);
    res.status(response.status).json(response.data);
});

router.post('/openlab', async function (req, res) {
    let response = await callAPI("calendar", "POST", req);
    res.status(response.status).json(response.data);
})

module.exports = router;
