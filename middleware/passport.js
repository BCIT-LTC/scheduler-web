const passport = require('passport');
var saml = require('passport-saml');
var fs = require('fs');
const jwt = require("jsonwebtoken");


var samlStrategy = new saml.Strategy({
    // config options here
    path: '/login/callback',
    callbackUrl: process.env.SAML_CALLBACK_URL,
    entryPoint: process.env.SAML_URL,
    issuer: process.env.SAML_ISSUER,
    audience: process.env.SAML_ISSUER,
    // wantAuthnResponseSigned: false,
    // signatureAlgorithm: 'sha256',
    cert: fs.readFileSync('idp.crt', 'utf-8'),
    // cert: process.env.SAML_IDP_CERT_STRING
    // privateKey: fs.readFileSync('saml/secrets/private.key', 'utf-8'),
    // passReqToCallback: true,
    // authnRequestBinding: 'HTTP-POST',
    // identifierFormat: null,
    // privateKey: fs.readFileSync(__dirname + '/certs/saml.pem', 'utf8'),
    // decryptionPvk: fs.readFileSync(__dirname + '/certs/saml.pem', 'utf8'),//optional private key that will be used to attempt to decrypt any encrypted assertions that are received
    // cert: fs.readFileSync('saml/certs/idp.crt', 'utf-8'),//the IDP's public signing certificate used to validate the signatures of the incoming SAML Responses, 
    // validateInResponseTo: false,
    // disableRequestedAuthnContext: true
}, async (profile, done) => {
    console.log("profile info: ");
    console.log(profile)
    console.log("---------------------------");
    console.log("email:", profile.email);
    console.log("firstname:", profile.firstname);
    console.log("lastname:", profile.lastname);
    console.log("(type):", profile.type);
    console.log("(program):", profile.program);

    
    let email = profile.email
    let firstname = profile.firstname
    let lastname = profile.lastname
    let eligibleAdmin = (profile.program === 'BSN' && profile.type != 'student');
    let jwtToken = jwt.sign({ email, firstname, lastname, eligibleAdmin }, process.env.JWT_TOKEN_SIGNING_KEY);
    await fetch(`${process.env.API_URL}login`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'content-Type': 'application/json',
        },
        mode: 'cors',
    }).then(async (response) => {
        console.log("RESPONSE FROM API")
        console.log(response)
        return await response.json();
    }).then((response) => {
        console.log(response);
        let isAdmin = response;
        jwtToken = jwt.sign({ email, firstname, lastname, isAdmin }, process.env.JWT_TOKEN_SIGNING_KEY);
        console.log(jwtToken)
    });
    return done(null, { token: jwtToken });
});

passport.use("samlStrategy", samlStrategy)

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    done(null, user);
});


module.exports = passport;
