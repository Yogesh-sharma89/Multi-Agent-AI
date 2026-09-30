import dotenv from "dotenv";

dotenv.config();

const EnvConfig = {
    port : process.env.PORT || 5000,
    authService:process.env.AUTH_SERVICE
}

export default EnvConfig;