import express from "express";
import CommentHandler from "@handlers/comments.handler";

const router = express.Router();
const commentHandler = new CommentHandler();

router.route("/").post(commentHandler.createComment);

router.route("/post/:postId").get(commentHandler.findCommentsByPostId);

router
  .route("/:id")
  .get(commentHandler.findCommentById)
  .patch(commentHandler.updateComment)
  .delete(commentHandler.deleteComment);

export default router;
