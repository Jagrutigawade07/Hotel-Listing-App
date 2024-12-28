const mongoose = require("mongoose");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  description:{ 
    type: String,
    required: [true, "Description is required"],
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number
  },
  location: {
    type: String
  },
  country: {
    type: String
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {  
      type: [Number],
      required: true,
    },
  },
  // category: {
  //   type: String,
  //   enum: ["Camping", "Mountains", "Beach", "Rooms", "Lake", "Luxury", "Others"],
  //   required: true,
  // },
});

listingSchema.post("findOneAndDelete", async(listing) =>{
  if (listing.reviews.length) {
    const res = await Review.deleteMany({ _id: { $in: listing.reviews } });
    console.log(res);
  }
}); 

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;