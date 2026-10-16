import express from "express";
import {errorHandler} from "@backend/shared";


const app = express();

//http-logger

app.use(express.json());

app.use(express.urlencoded({extended:true}))


app.get("/health",(_req,res)=>{
    res.json({
        success:true,
        message:"Agent service running properly"
    })
})

app.use(errorHandler);

export default app;