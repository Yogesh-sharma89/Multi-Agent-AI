import expres from "express";

const app = expres();

//http-logger

app.use(expres.json());

app.use(expres.urlencoded({extended:true}))


app.get("/health",(_req,res)=>{
    res.json({
        success:true,
        message:"Auth service running properly"
    })
})

export default app;