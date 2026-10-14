import dotenv from "dotenv";

dotenv.config();

const EnvConfig = {
    port : process.env.PORT || 5000,
    authService:process.env.AUTH_SERVICE,
    chatService:process.env.CHAT_SERVICE,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET ?? process.env.ACCESS_TOKEN_SCRET,
}

export default EnvConfig;