const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
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
     country: String,
   reviews: [
        {
         type: Schema.Types.ObjectId,
         ref : "Review"
        }
     ] 
});

// Deletes all associated reviews when a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
   if (listing) {
      await Review.deleteMany({ _id: { $in: listing.reviews}});
   }
});

const Listing = new mongoose.model("Listing",listingSchema);
module.exports = Listing