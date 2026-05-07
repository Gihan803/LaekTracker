const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("⏳ Connecting to Database...");

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("✅  Database Connected Successfully");
    console.log(`🗄️  Database : ${conn.connection.name}`);

  } catch (error) {
    console.error("❌  Database Connection Failed");
    console.error(`💥  Reason : ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;