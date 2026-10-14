import express from "express";
import {errorHandler} from "@backend/shared";
import chatRouter from "./routes/chat.route.js";

const app = express();

//http-logger

app.use(express.json());

app.use(express.urlencoded({extended:true}))


app.use("/api/chat",chatRouter);

app.get("/health",(_req,res)=>{
    res.json({
        success:true,
        message:"Chat service running properly"
    })
})

app.use(errorHandler);

export default app;