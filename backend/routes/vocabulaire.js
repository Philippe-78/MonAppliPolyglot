const express = require('express');
const Vocabulaire = require('../models/vocabulaire');

const router = express.Router();

// Route pour ajouter un vocabulaire
router.post('/', async (req, res) => {
  try {
    const { francais, anglais } = req.body;
    const nouveauMot = new Vocabulaire({ francais, anglais });
    await nouveauMot.save();
    res.status(201).json(nouveauMot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route pour récupérer le vocabulaire
router.get('/', async (req, res) => {
  try {
    const vocabulaire = await Vocabulaire.find();
    res.json(vocabulaire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
