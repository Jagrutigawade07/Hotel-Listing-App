const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  //map obj does not change existing array instead creates new array
  initData.data = initData.data.map((obj) => ({...obj, owner: "676d2a453d0f8721ed904481"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();