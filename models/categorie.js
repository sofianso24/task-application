import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorieSchema = new Schema(
    {
        name: {
            type: String,
            required: true
          },
       
        });
          
    
    export const Categorie = mongoose.model("categorie", categorieSchema);