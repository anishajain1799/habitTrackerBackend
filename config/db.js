import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI
        if(!uri) throw new Error("Mongo URI is not defined")
        const conn = await mongoose.connect(uri)
        console.log(`Mongodb connected: ${conn.connection.host}`)
    } catch (error) {
        console.log("Mongodb connection error: ", error.message)
        process.exit(1)
    }
}