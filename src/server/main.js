//PACKAGE IMPORTS
import express from "express";
import ViteExpress from "vite-express";
import cookieSession from "cookie-session";
import cors from "cors";
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

//ROUTES IMPORTS
import logout from "./routes/logout.cjs";
import default_jwt from "./routes/default_jwt.cjs";
import api from "./routes/api.cjs";
import saml_auth from "./routes/saml_auth.cjs";

//MIDDLEWARE IMPORTS
import passport from "./middleware/passport.cjs";
import authentication_check from "./middleware/authentication_check.cjs";

// import logger from "./logger.cjs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(bodyParser.json());
app.use(cookieParser());


app.use(
  cookieSession({
    secret: "cookies are gud 4 health",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use('/documentation', express.static('js_documentation'));
app.use("/auth/login", saml_auth);
app.use("/auth/authorize", default_jwt);
app.use("/api", authentication_check, api);
app.use("/logout", logout);


ViteExpress.listen(app, 9000, () =>
  // logger.info("Server is listening on port 9000...")
  console.log("Server is listening on port 9000... in " + process.env.NODE_ENV + " mode")

);
