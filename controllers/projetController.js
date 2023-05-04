import mongoose from 'mongoose';
import { Projet } from '../models/projet.js'

// Récupérer la liste des projets

export const getProjet = async (req, res) => {
    try {
      const projets = await Projet.find();
      res.json(projets);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  // Ajouter un projet

 export const addProjet = async (req, res) => {
    const projet = new Projet({
      name: req.body.name,
      description: req.body.description,
      start_date: req.body.start_date,
      end_date: req.body.end_date
    });
  
    try {
     await projet.save();
     
      res.status(201).json(projet);
      
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Mettre à jour un projet

 export const updateProjet = async (req, res) => {
    try {
      const projet = await Projet.findById(req.params.id);
      if (projet) {
        projet.name = req.body.name || projet.name;
        projet.description = req.body.description || projet.description;
        projet.start_date = req.body.start_date || projet.start_date;
        projet.end_date = req.body.end_date || projet.end_date;
  
         await projet.save();
        res.json(projet);
      }
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  
  // Supprimer un projet

  export const deleteProjet = async (req, res) => {
    try {
      const projet = await Projet.findById(req.params.id);
      if (projet) {
        projet.deleteOne()
        res.json({ message: 'Projet supprimé' });
      } else {
        res.status(404).json({ message: 'Projet non trouvé' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
 