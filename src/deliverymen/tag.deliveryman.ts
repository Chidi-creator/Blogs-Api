import express from "express";
import TagHandler from "@handlers/tag.handler";

const router = express.Router();
const tagHandler = new TagHandler();

//documentation for creating tags
/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Create a new tag
 *     tags:
 *       - Tags
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: Technology
 *     responses:
 *       '200':
 *         description: Tag created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                 message:
 *                   type: string
 *                   example: Tag created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

router.route("/").post(tagHandler.createTag);


//documentation for getting all tags
/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Get all tags
 *     tags:
 *       - Tags
 *     responses:
 *       '200':
 *         description: A list of tags
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 message:
 *                   type: string
 *                   example: Tags retrieved successfully
 *       '500':
 *         description: Internal server error
 */


router.route("/").get(tagHandler.findAllTags);

//documentation for finding tag by id
/**
 * @swagger
 * /tags/{tagid}:
 *   get:
 *     summary: Retrieve a tag by its ID
 *     tags:
 *       - Tags
 *     parameters:
 *       - in: path
 *         name: tagid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tag to retrieve
 *     responses:
 *       '200':
 *         description: Tag retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                 message:
 *                   type: string
 *                   example: Tag retrieved successfully
 *       '404':
 *         description: Tag not found
 *       '400':
 *         description: Invalid tag ID format
 *       '500':
 *         description: Internal server error
 */


//documentation for updating tag
/**
 * @swagger
 * /tags/{tagid}:
 *   patch:
 *     summary: Update a tag by its ID
 *     tags:
 *       - Tags
 *     parameters:
 *       - in: path
 *         name: tagid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tag to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Tag updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                 message:
 *                   type: string
 *                   example: Tag updated successfully
 *       '404':
 *         description: Tag not found
 *       '400':
 *         description: Invalid tag ID format
 *       '500':
 *         description: Internal server error
 */

//documentation for deleting tag
/**
 * @swagger
 * /tags/{tagid}:
 *   delete:
 *     summary: Delete a tag by its ID
 *     tags:
 *       - Tags
 *     parameters:
 *       - in: path
 *         name: tagid
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the tag to delete
 *     responses:
 *       '204':
 *         description: Tag deleted successfully
 *       '404':
 *         description: Tag not found
 *       '400':
 *         description: Invalid tag ID format
 *       '500':
 *         description: Internal server error
 */


router
  .route("/:tagid")
  .get(tagHandler.findTagById)
  .patch(tagHandler.updateTag)
  .delete(tagHandler.deleteTag);

export default router;
