import mongoose from "mongoose";

export const connectDB = async () =>{
    try {
         mongoose.connect(process.env.MONGO_URI)
         .then(console.log("Database connected successfully at : " + process.env.MONGO_URI));
    } catch (err) {
        console.error(err)
    }

}