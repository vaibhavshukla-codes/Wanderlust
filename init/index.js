const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const initData = require("./data.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
async function main(){
    await mongoose.connect(MONGO_URL);
}

main().then((res)=>{
    console.log("Connection successfull");
}).catch((err)=>{
    console.log(err);
});

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: "687e2876ec0346d10d217f45"
    }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();