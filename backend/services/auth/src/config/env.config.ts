import dotenv from "dotenv";

dotenv.config();

const EnvConfig = {
    port : process.env.PORT || 5000,
    dbUrl:process.env.DB_URL,
    environment:process.env.NODE_ENV,
    token:{
        access:process.env.ACCESS_TOKEN_SCRET,
        refresh:process.env.REFRESH_TOKEN_TOKEN
    },
    redisUrl:process.env.REDIS_URL
}

export default EnvConfig;