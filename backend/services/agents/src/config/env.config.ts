import dotenv from "dotenv";

dotenv.config();

const EnvConfig = {
    port: Number(process.env.PORT) || 5000,
    dbUrl: process.env.DB_URL
};

export default EnvConfig;