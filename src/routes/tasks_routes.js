import { Router } from "express";
import { validateToken } from "../middlewares/validatetoken.js";
import { getAllTasks, createTask, deleteTask } from "../controllers/tasks_controller.js";

const router = Router();

router.get('/get-tasks',validateToken, getAllTasks)
router.post('/create-task', validateToken, createTask)
router.delete('/delete-task', validateToken, deleteTask)


export default router;