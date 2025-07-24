const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    comment: String,
    rating: {
        type: String,
        min: 1,
        max: 5
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
    type: Schema.Types.ObjectId,
     ref: "User"
    }

});

// const Review = new mongoose.model("Review", reviewSchema);
// module.exports = Review;

module.exports = new mongoose.model("Review", reviewSchema);