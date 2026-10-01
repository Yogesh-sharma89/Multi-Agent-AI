import expres from "express";
import authRouter from "./routes/auth.route.js";
import {errorHandler} from "@backend/shared";

const app = expres();

//http-logger

app.use(expres.json());

app.use(expres.urlencoded({extended:true}))





app.use("/api/auth",authRouter);

app.get("/health",(_req,res)=>{
    res.json({
        success:true,
        message:"Auth service running properly"
    })
})

app.use(errorHandler);

export default app;