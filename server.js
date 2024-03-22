const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongodb = require("./data/database");
const indexRoute = require("./routes/index");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const cors = require("cors");

const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// This is the basic express session ({..}) initialization
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}));

// Init passport on every route call
app.use(passport.initialize());

// Allow passport to use "express-session"
app.use(passport.session());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})

app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}));

app.use(cors({ origin: '*'}));

app.use("/", indexRoute);

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}, function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get("/", (req, res) => { 
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out")
    console.log(req.session.user);
});

app.get("/github/callback", passport.authenticate("github", {
    failureRedirect: "/api-docs", session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect("/");
    }
);

process.on("uncaughtException", (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Connected to database and listening on port ${port}`);
        });
    }
});