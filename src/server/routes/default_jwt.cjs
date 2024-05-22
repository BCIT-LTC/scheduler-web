const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get('/default_jwt', (req, res) => {

    try {
        let default_jwt_token = jwt.sign({
            authorization_checked: false,
            is_logged_in: false
        }, process.env.JWT_AUTH_SIGNING_KEY);

        res.cookie('default_jwt', default_jwt_token,
            { httpOnly: false, sameSite: 'Strict', secure: false });
        res.redirect('/');
    } catch (error) {
        logger.error("Error retrieving anonymous token: " + error.message);
        return res.status(500).json(
            { error: "Error retrieving anonymous token: " + error.message }
        );
    }
});

module.exports = router;
