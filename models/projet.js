import mongoose from "mongoose";

const Schema = mongoose.Schema;

const projetSchema = new Schema(
    {
        name: {
            type: String,
            required: true
          },
          description: {
            type: String,
            required: true
          },
          start_date: {
            type: Date,
            required: true
          },
          end_date: {
            type: Date,
            required: true
          }
        });
          
    
    export const Projet = mongoose.model("projet", projetSchema);