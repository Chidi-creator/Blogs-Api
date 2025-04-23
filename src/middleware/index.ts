import express from "express";
import Middleware from "./middleware";
import cors from "cors";
import postRoutes from "@deliverymen/post.deliveryman";
import commentRoutes from "@deliverymen/comment.deliveryman";
import tagRoutes from "@deliverymen/tag.deliveryman";
import categoryRoutes from "@deliverymen/category.deliveryman";

const middleware = new Middleware(express());

const setUpRoutes = (middleware: Middleware) => {
  middleware.addMiddleware("/posts", postRoutes);
  middleware.addMiddleware("/comments", commentRoutes);
  middleware.addMiddleware("/tags", tagRoutes);
  middleware.addMiddleware("/categories", categoryRoutes);
};

const setUpMiddlewares = () => {
  middleware.addMiddleware(cors());
  middleware.addMiddleware(express.json());
  setUpRoutes(middleware);
  middleware.addMiddleware("/healthcheck", (req, res) => {
    res.send("Blog server is running");
  });
};

setUpMiddlewares();

export default middleware;
