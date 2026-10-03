import express from "express";
import authRouter from "./routes/auth.route.js";
import {errorHandler} from "@backend/shared";
import cookieParser from "cookie-parser";

const app = express();

//http-logger

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.use(cookieParser());

app.use("/api/auth",authRouter);

app.get("/health",(_req,res)=>{
    res.json({
        success:true,
        message:"Auth service running properly"
    })
})

app.use(errorHandler);

export default app;