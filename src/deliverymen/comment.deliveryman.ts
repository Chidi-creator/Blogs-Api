import express from "express";
import CommentHandler from "@handlers/comments.handler";

const router = express.Router();
const commentHandler = new CommentHandler();


//documentation for creating comments
/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment on a post
 *     tags:
 *       - Comments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - name
 *               - email
 *               - postId
 *             properties:
 *               content:
 *                 type: string
 *                 example: This is a great post!
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               postId:
 *                 type: string
 *                 example: 662682b2cbd83f6f83ccf7c3
 *     responses:
 *       '201':
 *         description: Comment created successfully
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
 *                     content:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     postId:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                 message:
 *                   type: string
 *                   example: Comment created successfully
 *       '400':
 *         description: Validation failed
 *       '500':
 *         description: Internal server error
 */

//documentation for getting all comments
/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Retrieve all comments
 *     tags:
 *       - Comments
 *     responses:
 *       '200':
 *         description: A list of all comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: Array of comment objects
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       content:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       postId:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 message:
 *                   type: string
 *                   example: Comments retrieved successfully
 *       '500':
 *         description: Internal server error
 */



router.route("/")
.post(commentHandler.createComment)
.get(commentHandler.findAllComments)




//documentation for retrieving comments for posts
/**
 * @swagger
 * /comments/post/{postId}:
 *   get:
 *     summary: Get all comments associated with a specific post
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post
 *     responses:
 *       '200':
 *         description: List of comments for the given post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: Array of comments
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       content:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       postId:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 message:
 *                   type: string
 *                   example: Comments retrieved successfully
 *       '400':
 *         description: Invalid post ID format
 *       '500':
 *         description: Internal server error
 */

router.route("/post/:postId").get(commentHandler.findCommentsByPostId);



//documentation for retreiving one comment by id
/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get a single comment by ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Comment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *                 message:
 *                   type: string
 *                   example: Comment retrieved successfully
 *       '400':
 *         description: Invalid comment ID format
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Internal server error
 */


//documentation for updating comment by id
/**
 * @swagger
 * /comments/{id}:
 *   patch:
 *     summary: Update a comment by ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Fields to update in the comment
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Comment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Comment'
 *                 message:
 *                   type: string
 *                   example: Comment updated successfully
 *       '400':
 *         description: Invalid comment ID format
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Internal server error
 */


//documentation for deleting comment - soft delete
/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Soft delete a comment by ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Comment deleted successfully (soft delete)
 *       '400':
 *         description: Invalid comment ID format
 *       '404':
 *         description: Comment not found
 *       '500':
 *         description: Internal server error
 */

router
  .route("/:id")
  .get(commentHandler.findCommentById)
  .patch(commentHandler.updateComment)
  .delete(commentHandler.deleteComment);

export default router;
