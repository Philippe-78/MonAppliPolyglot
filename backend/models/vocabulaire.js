const mongoose = require('mongoose');

const vocabulaireSchema = new mongoose.Schema({
  francais: { type: String, required: true },
  anglais: { type: String, required: true },
});

const Vocabulaire = mongoose.model('Vocabulaire', vocabulaireSchema);

module.exports = Vocabulaire;