import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

//Configuration

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.listen(5000, console.log("Server started on PORT 5000"));

//Mongoose Setup

const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
