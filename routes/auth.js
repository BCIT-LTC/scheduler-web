
const express = require("express");
const router = express.Router();
const callAPI = require("../helpers/API_caller");


router.get("/login", async (req, res) => {
    let response = await callAPI("login", "GET", req);
    res.status(response.status).json(response.data);
});

router.get("/admin", async (req, res) => {
    let response = await callAPI("admin", "GET", req);
    res.status(response.status).json(response.data);
});

router.post("/admin", async (req, res) => {
    let response = await callAPI("admin", "POST", req);
    res.status(response.status).json(response.data);
});
module.exports = router;

