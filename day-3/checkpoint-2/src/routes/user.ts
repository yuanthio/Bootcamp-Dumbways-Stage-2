import express from "express";
import { getUsers, findUser, createUser, updateUser, deleteUser } from "../controllers/user";

const router = express.Router();

router.get('/users', getUsers);
router.get('/find-user/:id', findUser);
router.post('/create-user', createUser);
router.put('/update-user/:id', updateUser);
router.delete('/delete-user/:id', deleteUser);

export default router;