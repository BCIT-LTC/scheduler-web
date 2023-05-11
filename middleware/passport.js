const passport = require('passport');
var saml = require('passport-saml');
var fs = require('fs');
const jwt = require("jsonwebtoken");


var samlStrategy = new saml.Strategy({
    // config options here
    callbackUrl: 'http://localhost:9000/login/callback',
    entryPoint: 'http://localhost:8080/simplesaml/saml2/idp/SSOService.php',
    issuer: 'localhost',
    identifierFormat: null,
    // privateKey: fs.readFileSync(__dirname + '/certs/saml.pem', 'utf8'),
    // decryptionPvk: fs.readFileSync(__dirname + '/certs/saml.pem', 'utf8'),//optional private key that will be used to attempt to decrypt any encrypted assertions that are received
    cert: fs.readFileSync('local_saml_config/certs/idp.crt', 'utf8'),//the IDP's public signing certificate used to validate the signatures of the incoming SAML Responses, 
    validateInResponseTo: false,
    disableRequestedAuthnContext: true

}, async (profile, done) => {
    console.log("profile info: ");
    console.log("email:", profile.email);
    console.log("firstname:", profile.firstname);
    console.log("lastname:", profile.lastname);
    console.log("(type):", profile.type);
    console.log("(program):", profile.program);

    let email = profile.email
    let firstname = profile.firstname
    let lastname = profile.lastname
    let eligibleAdmin = (profile.program === 'BSN' && profile.type != 'student');
    let jwtToken = jwt.sign({ email, firstname, lastname, eligibleAdmin }, process.env.SECRET_KEY);

    await fetch('http://host.docker.internal:8000/api/login', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${jwtToken}`,
            'content-Type': 'application/json',
        },
        mode: 'cors',
    }).then((response) => {
        return response.json();
    }).then((response) => {
        let isAdmin = response;
        jwtToken = jwt.sign({ email, firstname, lastname, isAdmin }, process.env.SECRET_KEY);
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
