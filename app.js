const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then((res)=>{
    console.log("Connection successfull");
}).catch((err)=>{
    console.log(err);
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,'/public'))); // to use static files of public folder

app.get('/',(req,res)=>{
    res.send("app is working");
});

// Routes starting with /listings will be handled by the listings router.
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);


// 404 Handler for Unmatched Routes
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Global Error Handling Middleware (for all thrown errors)
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("error.ejs",{message});
    // res.status(statusCode).send(message);
});

app.listen(8080,()=>{
    console.log("Server is lisetening to port 8080");
});