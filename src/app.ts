import { connDB } from "@config/db.config";
import { env } from "@config/env.config";
import express from 'express'
import middleware from "./middleware";
import mongoose from "mongoose";
import path from 'path'
const port = env.port
const app = express()

connDB()

middleware.addMiddleware('/uploads', express.static(path.join(__dirname, './uploads')))

mongoose.connection.once("open", () =>{
    middleware.getApp().listen(port, () =>{
        console.log(`server started on port ${port} and connected to the db`)
    })
})






