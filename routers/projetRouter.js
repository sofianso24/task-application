import  express  from "express";

import {getProjet,addProjet,updateProjet,deleteProjet}
        from "../controllers/projetController.js"

export const projetRoute = express.Router();

projetRoute.post("/addProjet",addProjet) 
projetRoute.get("/getProjet",getProjet) 
projetRoute.delete("/deleteProjet/:id",deleteProjet) 
projetRoute.patch("/updateProjet/:id",updateProjet) 