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

    let aquired_role = null
    if (profile.program == 'BSN') {
        if (profile.type == 'student') {
            aquired_role = 'student'
        }else{
            aquired_role = 'admin'
        }
    }
    else {
        // restrict access to non BSN accounts
    }

    let email = profile.email
    let firstname = profile.firstname
    let lastname = profile.lastname
    let role = aquired_role

    // const { email, firstname, lastname, role } = profile;
    let jwtToken = jwt.sign({ email, firstname, lastname, role }, process.env.SECRET_KEY);
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
