const passport = require('passport');
// var saml = require('passport-saml');
var OpenIDConnectStrategy = require('passport-openidconnect');
var fs = require('fs');
const jwt = require("jsonwebtoken");


// var samlStrategy = new saml.Strategy({
//     // config options here
//     callbackUrl: `${process.env.PUBLIC_URL}/login/callback`,
//     entryPoint: process.env.SAML_URL,
//     issuer: 'localhost',
//     identifierFormat: null,
//     // privateKey: fs.readFileSync(__dirname + '/certs/saml.pem', 'utf8'),
//     // decryptionPvk: fs.readFileSync(__dirname + '/certs/saml.pem', 'utf8'),//optional private key that will be used to attempt to decrypt any encrypted assertions that are received
//     cert: fs.readFileSync('saml/certs/idp.crt', 'utf8'),//the IDP's public signing certificate used to validate the signatures of the incoming SAML Responses, 
//     validateInResponseTo: false,
//     disableRequestedAuthnContext: true

// }, async (profile, done) => {
//     console.log("profile info: ");
//     console.log("email:", profile.email);
//     console.log("firstname:", profile.firstname);
//     console.log("lastname:", profile.lastname);
//     console.log("(type):", profile.type);
//     console.log("(program):", profile.program);

//     let email = profile.email
//     let firstname = profile.firstname
//     let lastname = profile.lastname
//     let eligibleAdmin = (profile.program === 'BSN' && profile.type != 'student');
//     let jwtToken = jwt.sign({ email, firstname, lastname, eligibleAdmin }, process.env.SECRET_KEY);
//     await fetch(`${process.env.API_URL}login`, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${jwtToken}`,
//             'content-Type': 'application/json',
//         },
//         mode: 'cors',
//     }).then(async (response) => {
//         return await response.json();
//     }).then((response) => {
//         console.log(response);
//         let isAdmin = response;
//         jwtToken = jwt.sign({ email, firstname, lastname, isAdmin }, process.env.SECRET_KEY);
//         console.log(jwtToken)
//     });
//     return done(null, { token: jwtToken });
// });


passport.use(new OpenIDConnectStrategy.Strategy({
    issuer: process.env['ISSUER'],
    authorizationURL: process.env['AUTHORIZATION_URL'],
    tokenURL: process.env['TOKEN_URL'],
    userInfoURL: process.env['USERINFO_URL'],
    clientID: process.env['CLIENT_ID'],
    clientSecret: process.env['CLIENT_SECRET'],
    callbackURL: process.env['CALLBACK_URL']
}, (issuer, profile, callback) => {

    console.log("verify ")

    // console.log(issuer)
    // console.log(profile)
    // console.log(cb)

}));

// passport.use("oidcStrategy", oidcStrategy)
// passport.use("samlStrategy", samlStrategy)

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    done(null, user);
});


module.exports = passport;
