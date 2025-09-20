import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?:number
}

const connection:ConnectionObject = {}

async function dbConnect():Promise<void>{
    console.log("Attempting to connect to database...");
    if(connection.isConnected){
        console.log("DataBase Already Connected")
        return 
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '',{})
        connection.isConnected = db.connections[0].readyState
        console.log("Db connected Successfully")

    } catch (error) {
        console.log("Database Connection Failed ",error)
        process.exit(1)
    }
}

export default dbConnect