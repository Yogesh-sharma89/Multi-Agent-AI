import expres from "express";
import cors from "cors";
import proxy from "express-http-proxy";
import EnvConfig from "./config/env.config.js";

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

app.get("/health",(_req,res)=>{
    res.json({
        success:true,
        message:"Gateway running properly"
    })
})

export default app;