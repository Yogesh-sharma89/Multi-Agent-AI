import app from "./app.js";
import EnvConfig from "./config/env.config.js";

const port = EnvConfig.port;


app.listen(port,()=>{
    console.log("Server is listening on port :",port)
})