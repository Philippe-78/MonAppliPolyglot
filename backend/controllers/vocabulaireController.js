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
// Récupérer tout le vocabulaire
exports.getVocabulaire = async (req, res) => {
  try {
      const vocabulaire = await Vocabulaire.find();
      res.json(vocabulaire);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.getVocabulaireById = async (req, res) => {
  try {
      const { id } = req.params;
      const vocabulaire = await Vocabulaire.findById(id);
      if (!vocabulaire) {
          return res.status(404).json({ message: "Mot non trouvé" });
      }
      res.json(vocabulaire);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.effacerVocabulaire = async (req, res) => {
  try {
      const { id } = req.params; // Récupérer l'ID du mot à supprimer
      console.log(`Suppression du mot avec ID: ${id}`);
      const deletedWord = await Vocabulaire.findByIdAndDelete(id); // Supprimer le mot
      console.log(`Mot supprimé: ${deletedWord}`);

      if (!deletedWord) {
          return res.status(404).json({ message: "Mot non trouvé" }); // Gérer le cas où le mot n'existe pas
      }
      res.status(200).json({ message: "Mot supprimé avec succès" }); // Répondre avec succès
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message }); // Gérer les erreurs
  }
};
// controllers/vocabulaireController.js
exports.modifierVocabulaire = async (req, res) => {
  try {
      const { id } = req.params;
      
      const { francais, anglais } = req.body;

      const updatedWord = await Vocabulaire.findByIdAndUpdate(id, { francais, anglais }, { new: true });
      console.log(`Mot modifier: ${francais, anglais}`);
      if (!updatedWord) {
          return res.status(404).json({ message: "Mot non trouvé" });
      }

      res.status(200).json(updatedWord);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

