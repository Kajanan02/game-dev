import mongoose from "mongoose";

const connectDB = async () => {
    try {

        const conn = await mongoose.connect("mongodb+srv://user:1234@cluster0.l1sv5bi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log(`MongoDB is connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error ${error}`)
        process.exit(1);
    }
}

export default connectDB;