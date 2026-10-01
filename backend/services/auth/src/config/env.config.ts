import dotenv from "dotenv";

dotenv.config();

const EnvConfig = {
    port : process.env.PORT || 5000,
    dbUrl:process.env.DB_URL
}

export default EnvConfig;