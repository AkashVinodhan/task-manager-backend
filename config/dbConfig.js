const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    const connection = await mongoose.connect(process.env.MONGO_URI, options);
    console.log("Connected to DB");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDb;
