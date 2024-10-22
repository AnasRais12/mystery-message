import mongoose from "mongoose";

type ConnectionObject = {
    isconnected?: number
}

const connection:ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isconnected){
      console.log("Already Connected to database") 
      return 
    }
    try {
      const db =  await mongoose.connect(process.env.MONGODBURL  || '',{})
       connection.isconnected = db.connections[0].readyState
       console.log("Db Connect Sucessfully")       
    } catch (error) {
        console.log("Databse Connection Failed")
        process.exit(1)
    }
}

export default dbConnect