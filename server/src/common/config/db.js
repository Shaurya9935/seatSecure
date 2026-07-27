import mongoose from "mongoose"

const connectDB = async () => {
    if (!process.env.MONGO_URI) {
        console.warn("MONGO_URI is not set. Skipping MongoDB connection.");
        return null;
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`)
}

export default connectDB;