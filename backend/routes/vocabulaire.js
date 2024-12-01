const express = require('express');
const Vocabulaire = require('../frontend/backend/models/vocabulaire');

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

// Route pour modifier un mot
router.put('/:id', async(req,res)=>{
    try{
    const{francais,anglais}=req.body;
    constupdatedVocabuaire=await Vocabulaire.fndByIdAndUpdate(
        req.params.id,
        {francais,anglais},
        {new:true}
    );
    req.json(updatedVocabulaire);
} catch(error){
    res.status(500).json({message:error.message});
}
});

// Route pour supprimer un mot
router.delete('/:id', async (req, res) => {
    try {
      const vocabulaire = await Vocabulaire.findByIdAndDelete(req.params.id);
      if (!vocabulaire) {
        return res.status(404).json({ message: 'Vocabulaire non trouvé' }); // Gérer le cas où l'ID n'existe pas
      }
      res.status(204).send(); // Status 204 No Content pour une suppression réussie
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  

module.exports = router;
