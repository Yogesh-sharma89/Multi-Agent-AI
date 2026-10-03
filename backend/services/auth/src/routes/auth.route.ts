import { Router } from "express";
import { firebaseAuth, GetCurrentUser } from "../controllers/auth.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const authRouter = Router();

//public routes 
authRouter.post("/firebase",firebaseAuth);

//protected routes
authRouter.use(AuthMiddleware)

authRouter.get("/me",GetCurrentUser)

export default authRouter;