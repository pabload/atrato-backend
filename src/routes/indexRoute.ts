import { Router } from "express";
import { addUser, deleteUser, getUserById, getUserByName, getUsers, getUsersByStatus, UpdateUser } from "../controllers/userController";


export const router = Router();

router.get("/users/",getUsers)
router.post("/users/",addUser)
router.put("/users/:id",UpdateUser)
router.delete("/users/:id",deleteUser)
router.get("/users/status/:status",getUsersByStatus)
router.get("/users/id/:id",getUserById)
router.get("/users/name/:name",getUserByName)





