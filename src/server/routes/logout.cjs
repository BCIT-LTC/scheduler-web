const express = require('express');
const router = express.Router();
const logger = require("../logger.cjs")(__filename);

/**
 * Delete cookies
 * @name post/logout
 * @function
 * @inner
 * @return {} 200 if true
 */
router.post("", async (req, res) => {
    // Unset the cookies by setting their expiration date in the past
    logger.info("logging out");
    res.clearCookie('jwt');
    res.clearCookie('default_jwt');
    res.clearCookie('PHPSESSIDIDP');
    res.clearCookie('SimpleSAMLAuthTokenIdp');
    res.clearCookie('session');
    res.clearCookie('session.sig');
    // Send a response to indicate the cookies have been unset
    res.sendStatus(200);
});

module.exports = router;