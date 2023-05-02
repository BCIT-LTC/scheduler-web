const passport = require('passport');
var saml = require('passport-saml');
var fs = require('fs');

var samlStrategy = new saml.Strategy({
    // config options here
    callbackUrl: 'http://localhost:9000/login/callback',
    entryPoint: 'http://localhost:8080/simplesaml/saml2/idp/SSOService.php',
    issuer: 'localhost',
    identifierFormat: null,
    // privateKey: fs.readFileSync(__dirname + '/certs/saml.pem', 'utf8'),
    // decryptionPvk: fs.readFileSync(__dirname + '/certs/saml.pem', 'utf8'),//optional private key that will be used to attempt to decrypt any encrypted assertions that are received
    cert: fs.readFileSync(__dirname + '/certs/idp.crt', 'utf8'),//the IDP's public signing certificate used to validate the signatures of the incoming SAML Responses, 
    validateInResponseTo: false,
    disableRequestedAuthnContext: true

}, async (profile, done) => {
    console.log("profile info: ");
    console.log("email:", profile.email);
    return done(null);
});

passport.use("samlStrategy", samlStrategy)

passport.serializeUser((user, done) => {
    console.log('-----------------------------');
    console.log('serialize user');
    console.log(user);
    console.log('-----------------------------');
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    console.log('-----------------------------');
    console.log('deserialize user');
    console.log(parseInt(id));
    console.log('-----------------------------');
});


module.exports = passport;
