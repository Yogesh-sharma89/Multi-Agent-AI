import mongoose from "mongoose";
import EnvConfig from "./env.config.js";

const ConnectToDb = async () => {
    try {

        if (!EnvConfig.dbUrl) {
            throw new Error("Missing database credentials");
        }

        await mongoose.connect(EnvConfig.dbUrl);
        console.log("MongoDB connected successfully");
    } catch (err) {
         console.log("Error in connecitng db : ",err)
    }
};

export default ConnectToDb;
