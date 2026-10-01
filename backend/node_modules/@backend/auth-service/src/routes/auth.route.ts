import { Router } from "express";
import { firebaseAuth } from "../controllers/auth.controller.js";

const authRouter = Router();

//public routes 
authRouter.post("/firebase",firebaseAuth);

export default authRouter;