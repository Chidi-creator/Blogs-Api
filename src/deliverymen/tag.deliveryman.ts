import express from "express";
import TagHandler from "@handlers/tag.handler";

const router = express.Router();
const tagHandler = new TagHandler();

router.route("/").post(tagHandler.createTag);
router.route("/").get(tagHandler.findAllTags);

router
  .route("/:id")
  .get(tagHandler.findTagById)
  .patch(tagHandler.updateTag)
  .delete(tagHandler.deleteTag);

export default router;
