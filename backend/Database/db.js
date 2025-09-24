const mongoose = require("mongoose");
const connectToDB = async () => {
  try {    
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connection successfull!`);
  }
   catch (error)
    {
    console.error(`Database connection failed!`);
    }
};

module.exports = connectToDB;
