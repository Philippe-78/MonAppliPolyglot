const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const vocabulaireRoutes = require('./routes/vocabulaire');

const app=express();
const PORT=5000;

//middleware
app.use(cors());
app.use(express.json());//pour parser les requêtes JSON

//connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/MonAppliPoliglot',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
});


// Utiliser les routes de vocabulaire
app.use('/vocabulaire', vocabulaireRoutes); // Ajouter le préfixe /vocabulaire

// démarrer le server
app.listen(PORT,()=>{

console.log(`Server en cours d'exécution sur http://localhost:${PORT}`);
})