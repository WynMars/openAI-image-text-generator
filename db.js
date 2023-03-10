require("dotenv").config();

const mongoose = require("mongoose");
const config = require("config");
// const db = config.get("mongoURI");


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {});

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

//THIS ONE DOESN'T WORK
// mongoose.connect('mongodb://localhost:27017/deal', {useNewUrlParser: true})

// mongoose.connect('mongodb://0.0.0.0:27017/deal',  () => {console.log(`Connected to MongoDB`)})
