import app from "./app.js";
import ConnectToDb from "./config/db.js";
import EnvConfig from "./config/env.config.js";

const port = EnvConfig.port;


const IntializeConnection = async () => {
    try {
        await ConnectToDb();

        app.listen(port, () => {
            console.log("Server is listening on port :", port)
        })

    } catch (err) {
     console.log("Error in auth service server :",err);
     process.exit(1);
    }
}

IntializeConnection();

