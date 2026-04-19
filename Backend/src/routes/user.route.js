import express from "express";
import  {registerUser, LoginUser,logoutUser,getMe}  from "../controllers/authController.js";
 import secureRoute from "../middleware/secureRoute.js";
const router=express.Router();



router.post("/register", registerUser);
router.post("/login",LoginUser)
router.post("/logout",logoutUser)

router.get("/me", secureRoute, getMe);







export default router;
 