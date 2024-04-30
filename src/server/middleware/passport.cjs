const passport = require("passport");
var saml = require("passport-saml");
var fs = require("fs");
const jwt = require("jsonwebtoken");
const SAML_CALLBACK_URL = process.env.APP_URL + "auth/login/callback";

var samlStrategy = new saml.Strategy(
  {
    // config options here
    callbackUrl: SAML_CALLBACK_URL,
    entryPoint: process.env.SAML_IDENTITY_PROVIDER_URL,
    issuer: process.env.SAML_ISSUER,
    audience: process.env.SAML_ISSUER,
    // wantAuthnResponseSigned: false,
    // signatureAlgorithm: 'sha256',
    cert: fs.readFileSync(process.env.SAML_IDP_CERT, 'utf-8'),
    // privateKey: fs.readFileSync('saml/secrets/private.key', 'utf-8'),
    // passReqToCallback: true,
    // authnRequestBinding: 'HTTP-POST',
    // identifierFormat: null,
    // privateKey: fs.readFileSync(__dirname + '/certs/saml.pem', 'utf8'),
    // decryptionPvk: fs.readFileSync(__dirname + '/certs/saml.pem', 'utf8'),//optional private key that will be used to attempt to decrypt any encrypted assertions that are received
    // cert: fs.readFileSync('saml/certs/idp.crt', 'utf-8'),//the IDP's public signing certificate used to validate the signatures of the incoming SAML Responses,
    // validateInResponseTo: false,
    // disableRequestedAuthnContext: true
  },
  async (profile, done) => {
    console.log("profile info: ");
    // console.log(profile);
    // console.log("---------------------------");

    let email = profile.email;
    let first_name = profile.first_name;
    let last_name = profile.last_name;
    let saml_role = profile.role;
    let app_role = "";
    let department = profile.department;
    let jwtToken = jwt.sign(
      {
        email,
        first_name,
        last_name,
        saml_role,
        app_role,
        department,
        authorization_checked: false,
        is_logged_in: true,
      },
      process.env.JWT_AUTH_SIGNING_KEY
    );

    console.log("PRE AUTHORIZATION CHECK")

    let response;
    const url = new URL(process.env.API_URL + "authorize");

    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      response
        .json()
        .then((data) => {
          console.log("Data: ", data.app_role )
          let email = data.email;
          let first_name = data.first_name;
          let last_name = data.last_name;
          let saml_role = data.role;
          let app_role = data.app_role;
          let department = data.department;
          jwtToken = jwt.sign(
            {
              email,
              first_name,
              last_name,
              saml_role,
              app_role,
              department,
              authorization_checked: true,
              is_logged_in: true,
            },
            process.env.JWT_AUTH_SIGNING_KEY
          );
        })
        .catch((error) => {
          switch (error.http_code) {
            case 400:
              console.log("Bad request sent to API: " + error);
              throw error;
            case 500:
              console.log("API cannot perform the request: " + error);
              throw error;
            default:
              console.log("Unknown error: " + error);
              throw error;
          }
        });
    } catch (error) {
      console.log("API unreachable: " + error.message);
      // return res.status(500).json({ error: "API unreachable: " + error.message });
    }
    console.log("POST AUTHORIZATION CHECK")
    return done(null, { token: jwtToken });
  }
);

passport.use("samlStrategy", samlStrategy);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  done(null, user);
});

module.exports = passport;
