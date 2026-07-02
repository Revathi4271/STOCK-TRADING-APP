import mongoose from "mongoose";

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Reads connection string from process.env.MONGO_URI.
 * Call this once when the server starts (see server.js).
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Mongoose 6+/8 no longer needs useNewUrlParser / useUnifiedTopology,
      // they are defaults now, kept here as documentation only:
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on("error", (err) => {
      console.error(`MongoDB connection error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected. Attempting to reconnect...");
    });

    return conn;
  } catch (error) {
    console.error(`Failed to connect to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
