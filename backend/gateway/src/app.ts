import expres from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import EnvConfig from "./config/env.config.js";
import { errorHandler } from "@backend/shared";
import Authenticate from "./middleware/auth.middleware.js";

const app = expres();

//http-logger

app.use(expres.json());

app.use(expres.urlencoded({extended:true}))

app.use(cors({
    origin:["http://localhost:5173"],
    credentials:true
}));

//Auth service proxy
app.use("/api/auth",proxy(EnvConfig.authService!,{
    proxyReqPathResolver:(req)=>{
        return req.originalUrl;
    }
}))

//chat proxy 
app.use("/api/chat",Authenticate,proxy(EnvConfig.chatService!,{
    
    proxyReqPathResolver:(req)=>{
        return req.originalUrl;
    },

    proxyReqOptDecorator:(proxyReqOpts, srcReq)=>{

        proxyReqOpts.headers = {
            ...proxyReqOpts.headers,
            "x-user-id":srcReq.user.userId,
            "x-user-email":srcReq.user.email,
            "x-session-id":srcReq.user.sessionId
        }

        return proxyReqOpts;
    }
}))

app.get("/health",(_req,res)=>{
    res.json({
        success:true,
        message:"Gateway running properly"
    })
})

app.use(errorHandler);

export default app;