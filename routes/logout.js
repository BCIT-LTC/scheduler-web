const express = require('express');
const router = express.Router();

/**
 * Delete cookies
 * @name post/logout
 * @function
 * @inner
 * @return {} 200 if true
 */
router.post("", async (req, res) => {
    // Unset the cookies by setting their expiration date in the past
    res.clearCookie('jwt');
    res.clearCookie('PHPSESSIDIDP');
    res.clearCookie('SimpleSAMLAuthTokenIdp');
    res.clearCookie('session');
    res.clearCookie('session.sig');
    // Send a response to indicate the cookies have been unset
    res.sendStatus(200);
});

module.exports = router;