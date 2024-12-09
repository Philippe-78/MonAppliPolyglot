
// module.exports = router;
const express = require('express');
const {
  ajouterVocabulaire,// Importer la fonction  ajouterVocabulaire   definie dans le fichier vocabulaireController
  getVocabulaire,// Importer la fonction      getVocabulaire       definie dans le fichier vocabulaireController
  getVocabulaireById, // S'assurer que c'est importé
  effacerVocabulaire,// Importer la fonction  effacerVocabulaire   definie dans le fichier vocabulaireController
  modifierVocabulaire,// Importer la fonction modifierVocabulaire  definie dans le fichier vocabulaireController
} = require('../controllers/vocabulaireController');

const router = express.Router();

// Route pour ajouter un vocabulaire
router.post('/', ajouterVocabulaire);

// Route pour récupérer tout le vocabulaire
router.get('/', getVocabulaire);


 router.get('/:id',getVocabulaireById,);// async (req, res) => {
//   try {
//       const { id } = req.params;
// console.log(`Requête GET pour le mot avec ID: ${id}`);
//       const vocabulaire = await Vocabulaire.findById(id);
//       if (!vocabulaire) {
//           return res.status(404).json({ message: "Mot non trouvé" });
//       }
//       res.json(vocabulaire);
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// });

// Route pour supprimer un mot de vocabulaire par ID
router.delete('/:id', effacerVocabulaire);

// Route pour modifier un vocabulaire par ID
router.put('/:id', modifierVocabulaire);





module.exports = router;
