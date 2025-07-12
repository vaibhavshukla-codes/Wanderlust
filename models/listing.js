const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
     title: {
        type: String,
        required: true
     },
     description: String ,
     image: {
        type: String,
        default: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1600&q=80",
        set: (v) => 
        v === "" 
        ? "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1600&q=80"
        : v
     },
     price: Number,
     location: String ,
     country: String
});

const Listing = new mongoose.model("Listing",listingSchema);

module.exports = Listing