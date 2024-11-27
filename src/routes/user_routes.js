import { Router } from "express";
import { validateToken } from "../middlewares/validatetoken.js";
import { getUser, deleteUser } from "../controllers/user_controller.js";

const router = Router();

router.get('/get-user', validateToken, getUser);

router.delete('/delete-user', validateToken, deleteUser);

export default router;