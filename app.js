import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"

import {categorieRoute } from "../server/routers/categorieRouter.js"
import {projetRoute } from "../server/routers/projetRouter.js"
import { tacheRoute } from "../server/routers/tacheRouter.js"

dotenv.config();
const port = process.env.PORT;
const dbURI = process.env.DBURI;

const app = express();
mongoose.set("strictQuery", true);
mongoose
  .connect(dbURI)
  .then((result) => {
    app.listen(port, () => {
      console.log(`this app is running in port http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/taches", tacheRoute);
app.use("/projets", projetRoute);
app.use("/categories", categorieRoute);
