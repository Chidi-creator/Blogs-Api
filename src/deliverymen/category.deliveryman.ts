import express from "express";
import CategoryHandler from "@handlers/category.handler"; // Adjust the import based on your structure

const router = express.Router();
const categoryHandler = new CategoryHandler();

router.route("/")
  .post(categoryHandler.createCategory) 
  .get(categoryHandler.findAllCategories); 

router
  .route("/:id")
  .get(categoryHandler.findCategoryById) 
  .patch(categoryHandler.updateCategory)
  .delete(categoryHandler.deleteCategory);

export default router;