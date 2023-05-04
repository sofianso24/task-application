import mongoose from "mongoose";
import { Tache } from '../models/tache.js'


// Récupérer la liste des tâches

export const getTasks = async (req, res) => {
    try {
      const tasks = await Tache.find().populate('category');
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Ajouter une tâche

 export const addTask = async (req, res) => { 
  
    const task = new Tache({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      category: req.body.category,
      project : req.body.project
    });
  console.log(task)
    try {
       await task.save();
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Mettre à jour une tâche

 export const updateTask = async (req, res) => {
    try {
      const task = await Tache.findById(req.params.id);
      if (task) {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.priority = req.body.priority || task.priority;
        task.category = req.body.category || task.category;
        task.project = req.body.project || task.project;
  
         await task.save();
        res.json(task);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Supprimer une tâche*

 export const deleteTask = async (req, res) => {
    try {
      const task = await Tache.findById(req.params.id);
      if (task) {
        await task.deleteOne();
        res.json({ message: 'Tâche supprimée' });
      } else {
        res.status(404).json({ message: 'Tâche non trouvée' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };