const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

router.post("/signup",
    wrapAsync(async (req, res) => {
        try {
            let { username, email, password } = req.body;
            let newUser = new User({ username, email });
            let registeredUser = await User.register(newUser, password); //Registers a new user and saves in MongoDB
            console.log(registeredUser);
            req.flash("success", "Welcome to Wanderlust");
            res.redirect("/listings");
        }
        catch (e) {
            req.flash("error", e.message); // e.message comes from passport-local-mongoose
            res.redirect("/signup");
        }
    })
);

router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

// passport.authenticate("local") comes from Passport.js 
// It verifies the username and password using the local strategy.
// If authentication fails, it redirects to /login and flashes an error.
router.post("/login", passport.authenticate("local",
    {
        failureRedirect: "/login",
        failureFlash: true
    }),
    async (req, res) => {
        req.flash("success", "Welcome back to Wanderlust!");
        res.redirect("/listings");
    }
);


module.exports = router;