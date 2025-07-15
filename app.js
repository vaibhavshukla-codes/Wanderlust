const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js");

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

//A custom Express middleware function 
const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    }
    else {
        next();
    }
}

//Index route
app.get('/listings', wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
   })
);

//New route
app.get('/listings/new',(req,res)=>{
    res.render("listings/new.ejs")
})

//Show route
app.get('/listings/:id',wrapAsync(async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
    })
);

//Create route
app.post('/listings',validateListing,wrapAsync(async (req, res, next) =>
 {  
    let result = listingSchema.validate(req.body);
    console.log(result);
    if (result.error) {
        throw new ExpressError(400, result.error);
    }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
 })
);

//Edit route
app.get('/listings/:id/edit',wrapAsync(async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
   })
);

//Upadate route
app.put('/listings/:id',validateListing, wrapAsync(async (req, res) => {
       const {id} = req.params;
       await Listing.findByIdAndUpdate(id,{ ...req.body.listing });
       res.redirect(`/listings/${id}`);
    })
);

//Delete route
app.delete('/listings/:id',wrapAsync(async(req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
   })
);

// app.get('/testListing', async (req,res)=>{
//     const sampleListing = new Listing({
//         title: "Amritsar",
//         description: "Famous ritual place",
//         price: 9000,
//         location: "Pubjab",
//         country: "India"
//     });
//    await sampleListing.save();
//    res.send("Listing saved");
// });


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