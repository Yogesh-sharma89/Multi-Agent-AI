import dotenv from "dotenv";

dotenv.config();

const EnvConfig = {
    port:process.env.PORT || 5002,
    environment:process.env.NODE_ENV,
    dbUrl:process.env.DB_URL
}


export default EnvConfig;