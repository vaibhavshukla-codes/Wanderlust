const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });

//req.user is a fixed property name provided by Passport, not related to the name of your model.
//Index route and Create route
router
  .route("/")
  .get(wrapAsync(listingController.index))
    .post(
      isLoggedIn,
      upload.single('listing[image]'),
      validateListing,
      wrapAsync(listingController.createListing)
  );
 


//New route
//isLoggedIn is a middleware
router.get("/new", isLoggedIn, listingController.renderNewForm);


//Show route and Update route and //Delete route
router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(
  isLoggedIn,
  isOwner,
  upload.single('listing[image]'),
  validateListing,
  wrapAsync(listingController.updateListing)
)
.delete(
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.destroyListing)
)



//Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);


module.exports = router;
