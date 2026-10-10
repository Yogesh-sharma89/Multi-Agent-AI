import { Router } from "express";
import { firebaseAuth, GetCurrentUser, Logout, refreshSession } from "../controllers/auth.controller.js";
import AuthMiddleware from "../middleware/auth.middleware.js";

const authRouter = Router();

//public routes 
authRouter.post("/firebase",firebaseAuth);

authRouter.post("/refresh",refreshSession);

//protected routes
authRouter.use(AuthMiddleware)

authRouter.get("/me",GetCurrentUser)
authRouter.post("/logout",Logout);

export default authRouter;