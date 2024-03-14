var jwt = require('jsonwebtoken');

const authentication_check = (req, res, next) => {
  let token;
  // Check if the token is in the authorization header
  try{
    token = req.headers.authorization.split(" ")[1];
  }catch{
    return res.status(400).send({ error: "Token missing from Authorization header" });
  }

  // Check if the token is valid
  try {
    jwt.verify(token, process.env.JWT_AUTH_SIGNING_KEY)
    next(); // Token is valid, continue
  } catch {
    return res.status(400).send({ error: "Token invalid" });
  }
}

module.exports = authentication_check;