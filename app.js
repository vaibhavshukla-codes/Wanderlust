const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

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


//Index route
app.get('/listings', async (req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

//New route
app.get('/listings/new',(req,res)=>{
    res.render("listings/new.ejs")
})

//Show route
app.get('/listings/:id',async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//Create route
app.post('/listings',async (req,res)=>{
    const newListing = new Listing(req.body.listing);
     await newListing.save();
     res.redirect("/listings");
});

//Edit route
app.get('/listings/:id/edit',async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//Upadate route
app.put('/listings/:id',async (req,res)=>{
       const {id} = req.params;
       await Listing.findByIdAndUpdate(id,{ ...req.body.listing });
       res.redirect(`/listings/${id}`);
});

//Delete route
app.delete('/listings/:id',async(req,res)=>{
    const {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

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

app.listen(8080,()=>{
    console.log("Server is lisetening to port 8080");
});