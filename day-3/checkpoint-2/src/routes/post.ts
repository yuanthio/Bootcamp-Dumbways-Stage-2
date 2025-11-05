import express from "express";
import { getPosts, getCommentsByPost, getCommentsSummary, findPost, createPosts, updatePost, deletePost } from "../controllers/post";

const router = express.Router();

router.get('/posts', getPosts);
router.get('/posts/:id/comments', getCommentsByPost);
router.get('/posts/comments-summary', getCommentsSummary);
router.get('/find-post/:id', findPost);
router.post('/create-post', createPosts);
router.put('/update-post/:id', updatePost);
router.delete('/delete-post/:id', deletePost);

export default router;