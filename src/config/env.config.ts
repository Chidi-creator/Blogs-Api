import { EnvConfig } from "./types/env";
import dotenv from "dotenv";

dotenv.config()

export const env: EnvConfig = {
  db_uri: process.env.DB_URI!,
  port: parseInt(process.env.PORT!),
};


