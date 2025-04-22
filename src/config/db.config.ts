import mongoose from "mongoose";
import { env } from "./env.config";
import { DatabaseError } from "@managers/error.manager";


export const connDB = async () => {
  try {
    await mongoose.connect(env.db_uri);
  } catch (eror: any) {
    throw new DatabaseError(`Error connecting to Databse: ${eror.message} `);
  }
};
