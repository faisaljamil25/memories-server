import express from "express";

import {
  getPosts,
  createPost,
  updatePost,
  getPost,
  deletePost,
} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.get("/:id", getPost);
router.delete("/:id", deletePost);

export default router;
