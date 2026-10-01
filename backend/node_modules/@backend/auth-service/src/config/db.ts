import mongoose from "mongoose";
import EnvConfig from "./env.config.js";

const ConnectToDb = async()=>{
    try{
        
       const dbSecret  =EnvConfig.dbUrl;
       if(!dbSecret){
        throw new Error("Missing db credentials")
       }

       await mongoose.connect(dbSecret);

       console.log("MongoDb connected successfully ")
        
    }catch(err){
      console.log("Failed to connect with db :",err);
    }
}

export default ConnectToDb;