import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import config from "./config";

import apiRouter from "./routes";
import errorsMiddleware from "./middleware/error-middleware";
import { addXRequestId } from "./middleware/opentelemetry-middleware";

const PORT = config.PORT;

const app = express();
app.use(express.json());
app.use(cors({
  // origin: [
  //   'http://localhost',
  // ],
  origin: /http:\/\/localhost:.{4,5}/,
  credentials: true
}));
app.use(cookieParser());

app.use(addXRequestId)
app.use("/api", apiRouter);
app.use(errorsMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`
        Server started at
        http://localhost:${PORT}
      `);
    })
  } catch (error) {
    console.log("Error from start server", error);
  }
};

start();