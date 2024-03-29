const express = require("express");
const router = express.Router();
const ApiRequests = require("../services/api_requests");
const api = require("../api");

/**
 * Route to make sure the API db is storing the user
 * @name get/users
 * @function
 * @memberof module:routers/users~usersRouter
 * @inner
 * @return {Object} list of all users
 */
router.get("/users", (req, res) => {
  api.all(req, res);
  this.route.res.status(200).json({ users: "users" });
});

router.param("user_id", function (req, res, next, id) {
  // sample user, would actually fetch from API
  req.user = {
    id: id,
    name: "TJ",
  };
  next();
});

router
  .route("/user/:user_id")
  .all(function (req, res, next) {
    // runs for all HTTP verbs first
    // think of it as route specific middleware!
    next();
  })
  //get user
  .get(function (req, res, next) {
    res.json(req.user);
  })
  .put(function (req, res, next) {
    // just an example of maybe updating the user
    req.user.name = req.params.name;
    // save user ... etc
    res.json(req.user);
  })
  .post(function (req, res, next) {
    next(new Error("not implemented"));
  })
  .delete(function (req, res, next) {
    next(new Error("not implemented"));
  });

module.exports = router;
