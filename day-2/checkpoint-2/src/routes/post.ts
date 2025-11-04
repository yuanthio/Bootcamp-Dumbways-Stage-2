import express from "express";
import { getPosts, findPost, createPosts, updatePost, deletePost } from "../controllers/post";

const router = express.Router();

router.get('/posts', getPosts);
router.get('/find-post/:id', findPost);
router.post('/create-post', createPosts);
router.put('/update-post/:id', updatePost);
router.delete('/delete-post/:id', deletePost);

export default router;