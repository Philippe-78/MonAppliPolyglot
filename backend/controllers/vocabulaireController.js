// controllers/vocabulaireController.js
const Vocabulaire = require('../models/vocabulaire');

// Ajouter un vocabulaire
exports.ajouterVocabulaire = async (req, res) => {
  try {
    const { francais, anglais } = req.body;
    const nouveauMot = new Vocabulaire({ francais, anglais });
    await nouveauMot.save();
    res.status(201).json(nouveauMot);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


