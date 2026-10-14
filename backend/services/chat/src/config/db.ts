import mongoose from "mongoose";
import EnvConfig from "./env.config.js";

const ConnectToDb = async()=>{
    try{

        const dbUrl = EnvConfig.dbUrl;

        if(!dbUrl){
            throw new Error("Missing db credentials")
        }

        await mongoose.connect(dbUrl);

        console.log("MongoDB connected successfully")

    }catch(err){
      console.log("Error in connecting to DB :",err)
    }
}

export default ConnectToDb;