import mongoose from 'mongoose';
import { Categorie } from '../models/categorie.js'


// Récupérer la liste des catégories

export const getCategories = async (req, res) => {
    try {
      const categories = await Categorie.find();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Ajouter une catégorie

 export const addCategory = async (req, res) => {
    const category = new Categorie({
      name: req.body.name,
    });
  
    try {
       await category.save();
      res.status(201).json(category);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Mettre à jour une catégorie

 export const updateCategory = async (req, res) => {
    try {
      const category = await Categorie.findById(req.params.id);
      if (category) {
        category.name = req.body.name || category.name;
    
         await category.save();
        res.json(category);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Supprimer une catégorie

 export const deleteCategory = async (req, res) => {
    try {
      const category = await Categorie.findById(req.params.id);
      if (category) {
        await category.deleteOne();
        res.json({ message: 'Catégorie supprimée' });
      } else {
        res.status(404).json({ message: 'Catégorie non trouvée' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  