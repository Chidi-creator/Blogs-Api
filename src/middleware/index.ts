import express from 'express'
import Middleware from './middleware'
import cors from 'cors'
import postRoutes from '@deliverymen/post.deliveryman'

const middleware = new Middleware(express())



const setUpRoutes = (middleware: Middleware) =>{
    middleware.addMiddleware('/posts', postRoutes)

}

const setUpMiddlewares = () =>{
middleware.addMiddleware(cors())
setUpRoutes(middleware)
middleware.addMiddleware("/healthcheck", (req, res) => {
    res.send("Blog server is running");
  });
}

setUpMiddlewares()

export default middleware