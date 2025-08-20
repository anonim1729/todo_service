import { Router } from "express";
import {
    getAllTasks,
    getSingleTask,
    addTask,
    updateTask,
    deleteTask
} from "../controllers/taskController.js";
import { requireAuth } from "../middleware/requireAuth.js";

const router = Router();

router.use(requireAuth);

router.get('/tasks', getAllTasks)

router.get('/tasks/:id', getSingleTask)

router.post('/tasks', addTask)

router.patch('/tasks/:id', updateTask)

router.delete('/tasks/:id', deleteTask)

export default router;