import express from "express";
import upload from "@config/multer.config";
import PostHandler from "@handlers/post.handler";

const router = express.Router();

const postHandler = new PostHandler();


//documentation for creating posts
/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags:
 *       - Posts
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Post
 *               content:
 *                 type: string
 *                 example: This is the content of my post.
 *               author:
 *                 type: string
 *                 example: John Doe
 *               category:
 *                 type: string
 *                 example: 66425087a3b6c945b83d9099
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["66425087a3b6c945b83d90a1", "66425087a3b6c945b83d90a2"]
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Post created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 66425087a3b6c945b83d9098
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 author:
 *                   type: string
 *                 category:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                 imageUrl:
 *                   type: string
 *                   example: http://localhost:3009/uploads/image.jpg
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 message:
 *                   type: string
 *                   example: Post created successfully
 *       '400':
 *         description: Validation failed
 *       '500':
 *         description: Internal server error
 */


//documentation for getting all posts
/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - Posts
 *     responses:
 *       '200':
 *         description: List of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       author:
 *                         type: string
 *                       category:
 *                         type: string
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       imageUrl:
 *                         type: string
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 message:
 *                   type: string
 *                   example: Posts retrieved successfully
 *       '500':
 *         description: Internal server error
 */


router
  .route("/")
  .post(upload.single("image"), postHandler.createPost)
  .get(postHandler.findAllPosts);

  //documentation for creating many 
/**
 * @swagger
 * /posts/create-many:
 *   post:
 *     summary: Create multiple posts
 *     tags:
 *       - Posts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                   example: Sample Post Title
 *                 content:
 *                   type: string
 *                   example: Sample post content here...
 *                 author:
 *                   type: string
 *                   example: John Doe
 *                 category:
 *                   type: string
 *                   example: 66425087a3b6c945b83d9099
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["66425087a3b6c945b83d90a1"]
 *                 imageUrl:
 *                   type: string
 *                   example: http://localhost:3009/uploads/image.jpg
 *     responses:
 *       '201':
 *         description: Posts created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       author:
 *                         type: string
 *                       category:
 *                         type: string
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       imageUrl:
 *                         type: string
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 message:
 *                   type: string
 *                   example: Posts created successfully
 *       '400':
 *         description: Validation failed for one or more posts
 *       '500':
 *         description: Internal server error
 */

router.route("/create-many").post(postHandler.createManyPosts);


//documentation for searching for blogs through the title as keywords:
/**
 * @swagger
 * /posts/title:
 *   get:
 *     summary: Search posts by keyword in title
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Keyword to search for in post titles (case-insensitive)
 *     responses:
 *       '200':
 *         description: List of posts matching the keyword
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
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       imageUrl:
 *                         type: string
 *                       author:
 *                         type: string
 *                       category:
 *                         type: string
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 message:
 *                   type: string
 *                   example: Posts retrieved successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */

router.route("/title").get(postHandler.findByQuery);


//documentation for getting post by id
/**
 * @swagger
 * /posts/{postid}:
 *   get:
 *     summary: Get a post by its ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to retrieve
 *     responses:
 *       '200':
 *         description: Post retrieved successfully
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
 *                     title:
 *                       type: string
 *                     content:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *                     author:
 *                       type: string
 *                     category:
 *                       type: string
 *                     tags:
 *                       type: array
 *                       items:
 *                         type: string
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                 message:
 *                   type: string
 *                   example: Post retrieved successfully
 *       '404':
 *         description: Post not found
 *       '400':
 *         description: Invalid ID
 *       '500':
 *         description: Internal server error
 */


//documentation for updating post by id
/**
 * @swagger
 * /posts/{postid}:
 *   patch:
 *     summary: Update a post by its ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               author:
 *                 type: string
 *               category:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       '200':
 *         description: Post updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Post'
 *                 message:
 *                   type: string
 *                   example: Post updated successfully
 *       '404':
 *         description: Post not found or already deleted
 *       '400':
 *         description: Invalid ID
 *       '500':
 *         description: Internal server error
 */

//documentation for deleting posts by id
/**
 * @swagger
 * /posts/{postid}:
 *   delete:
 *     summary: Soft delete a post by its ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to soft delete
 *     responses:
 *       '204':
 *         description: Post deleted successfully
 *       '404':
 *         description: Post not found
 *       '400':
 *         description: Invalid ID
 *       '500':
 *         description: Internal server error
 */



router
  .route("/:postid")
  .delete(postHandler.deletePost)
  .get(postHandler.findPostById)
  .patch(postHandler.updatePostById);


//documentation for finding posts by category id
/**
 * @swagger
 * /posts/{categoryid}:
 *   get:
 *     summary: Get posts by category ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: categoryid
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the category to filter posts by
 *     responses:
 *       '200':
 *         description: Posts retrieved successfully
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
 *                       title:
 *                         type: string
 *                       content:
 *                         type: string
 *                       imageUrl:
 *                         type: string
 *                       author:
 *                         type: string
 *                       category:
 *                         type: string
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 message:
 *                   type: string
 *                   example: Post retrieved successfully
 *       '404':
 *         description: Post not found
 *       '400':
 *         description: Invalid category ID
 *       '500':
 *         description: Internal server error
 */

  router
  .route('/:categoryid')
  .get(postHandler.findPostByCategoryId)
    

export default router;
