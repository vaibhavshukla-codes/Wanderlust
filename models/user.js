const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }
});

// username,hashing,salting and hash password will be implemented by passport-local-mongoose plugin.
// username and password will be added by the passportLocalMongoose
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
