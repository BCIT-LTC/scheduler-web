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
    console.log(profile);
    console.log("---------------------------");

    let email = profile.email;
    let first_name = profile.first_name;
    let last_name = profile.last_name;
    let saml_role = profile.role;
    let app_roles = [];
    let department = profile.department;
    let jwtToken = jwt.sign(
      {
        email,
        first_name,
        last_name,
        saml_role,
        app_roles,
        department,
        authorization_checked: false,
        is_logged_in: true,
      },
      process.env.JWT_AUTH_SIGNING_KEY
    );

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
          if (response.status !== 200) {
            throw Error(data.error);
          }
          let email = data.email;
          let first_name = data.first_name;
          let last_name = data.last_name;
          let saml_role = data.saml_role;
          let app_roles = data.app_roles;
          let department = data.department;
          jwtToken = jwt.sign(
            {
              email,
              first_name,
              last_name,
              saml_role,
              app_roles,
              department,
              authorization_checked: true,
              is_logged_in: true,
            },
            process.env.JWT_AUTH_SIGNING_KEY
          );
          return done(null, { token: jwtToken });
        })
        .catch((error) => {
          switch (response.status) {
            case 400:
              return done("Bad request sent to API: " + error);
            case 500:
              return done("API cannot perform the request: " + error);
            default:
              return done("Unknown error: " + error);
          }
        });
    } catch (error) {
      return done("API unreachable: " + error.message);
    }
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
