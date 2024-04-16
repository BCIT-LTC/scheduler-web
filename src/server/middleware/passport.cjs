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
    cert: fs.readFileSync('./saml/idp.crt', 'utf-8'),
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
    console.log("email:", profile.email);
    console.log("first_name:", profile.first_name);
    console.log("last_name:", profile.last_name);
    console.log("role:", profile.role);
    console.log("app_role:", profile.app_role);
    // console.log("school:", profile.school);
    // console.log("program:", profile.program);

    let email = profile.email;
    let first_name = profile.first_name;
    let last_name = profile.last_name;
    let saml_role = profile.role;
    let app_role = profile.app_role || "";
    let school = "";
    let program = "";
    let jwtToken = jwt.sign(
      {
        email,
        first_name,
        last_name,
        saml_role,
        app_role,
        school,
        program,
        authorization_checked: false,
        is_logged_in: true,
      },
      process.env.JWT_AUTH_SIGNING_KEY
    );
    // await fetch(`${process.env.API_URL}login`, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': `Bearer ${jwtToken}`,
    //         'content-Type': 'application/json',
    //     },
    //     mode: 'cors',
    // }).then(async (response) => {
    //     console.log("RESPONSE FROM API")
    //     console.log(response)
    //     return await response.json();
    // }).then((response) => {
    //     console.log(response);
    //     let isAdmin = response;
    //     jwtToken = jwt.sign({ email, firstname, lastname, isAdmin }, process.env.JWT_AUTH_SIGNING_KEY);
    //     console.log(jwtToken)
    // });
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
