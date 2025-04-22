import express from "express";
import upload from "@config/multer.config";
import PostHandler from "@handlers/post.handler";

const router = express.Router();

const postHandler = new PostHandler();

router
  .route("/")
  .post(upload.single("image"), postHandler.createPost)
  .get(postHandler.findAllPosts);

router.route("/create-many").post(postHandler.createManyPosts);

router.route("/title").get(postHandler.findByQuery);

router
  .route("/:id")
  .delete(postHandler.deletePost)
  .get(postHandler.findPostById)
  .patch(postHandler.updatePostById);

  router
  .route('/:categoryid')
  .get(postHandler.findPostByCategoryId)
    

export default router;
