import  express  from "express";

import {getCategories,addCategory,updateCategory,deleteCategory  }
         from '../controllers/categorieController.js'

export const categorieRoute = express.Router();

categorieRoute.post("/addCategorie",addCategory)
categorieRoute.put("/updateCategorie/:id",updateCategory)
categorieRoute.get("/getCategorie",getCategories)
categorieRoute.delete("/deleteCategorie/:id",deleteCategory)

