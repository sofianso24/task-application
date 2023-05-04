import mongoose from "mongoose";

const Schema = mongoose.Schema;

const tacheSchema = new Schema(
{
    title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      priority: {
        type: String,
        enum:["hight","medium","low"],
        required: true
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categorie',
        required: true
      },
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projet',
        required: true
      }
    });
      

export const Tache = mongoose.model("tache", tacheSchema);