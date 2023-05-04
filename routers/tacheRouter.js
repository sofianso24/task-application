import  express  from "express";

import { getTasks,addTask,updateTask,deleteTask }
         from '../controllers/tacheController.js'

export const tacheRoute = express.Router();



tacheRoute.post("/addTache",addTask)        
tacheRoute.delete("/deleteTache/:id",deleteTask)        
tacheRoute.patch("/updateTache/:id",updateTask)        
tacheRoute.get("/getTache",getTasks)        
