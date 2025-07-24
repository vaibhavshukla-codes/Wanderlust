const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

// signup route
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup",
    wrapAsync(async (req, res) => {
        try {
            let { username, email, password } = req.body;
            let newUser = new User({ username, email });
            let registeredUser = await User.register(newUser, password); //Registers a new user and saves in MongoDB
            // console.log(registeredUser);
            req.login(registeredUser, (err) => {
                if (err) {
                    return next(err);
                }
                req.flash("success", "Welcome to Wanderlust");
                res.redirect("/listings");
            });
        }
        catch (e) {
            req.flash("error", e.message); // e.message comes from passport-local-mongoose
            res.redirect("/signup");
        }
    })
);

//login route
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

// passport.authenticate("local") comes from Passport.js 
// It verifies the username and password using the local strategy.
// If authentication fails, it redirects to /login and flashes an error.
router.post(
    "/login",
    saveRedirectUrl,
    passport.authenticate("local",
    {
        failureRedirect: "/login",
        failureFlash: true
    }),
    async (req, res) => {
        req.flash("success", "Welcome back to Wanderlust!");
        let redirectUrl = req.session.redirectUrl || "/listings";
        delete req.session.redirectUrl;
        res.redirect(redirectUrl);
    }
);

//logout route
router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out now!");
        res.redirect("/listings");
    });
});

module.exports = router;