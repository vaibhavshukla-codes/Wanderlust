const User = require("../models/user");

module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = async (req, res) => {
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
}
    
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
}

module.exports.login =  async (req, res) => {
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    if (
        redirectUrl.includes("/reviews/") &&
        redirectUrl.includes("?_method=DELETE")
      ) {
        const match = redirectUrl.match(/\/listings\/([^\/]+)/);
        redirectUrl = match ? `/listings/${match[1]}` : "/listings";
      }      
    res.redirect(redirectUrl);
}


module.exports.logout =  (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "you are logged out now!");
        res.redirect("/listings");
    });
}