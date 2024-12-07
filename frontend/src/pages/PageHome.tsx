import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div>
      <h1>Bienvenue dans votre dictionnaire AppliPolyglot</h1>
      <Link to="/ajouter">Ajouter du Vocabulaire dans votre dictionnaire</Link>
      <br/>
      <Link to="/consulter">Consulter votre liste de vocabulaire</Link>
    </div>
  );
};

export default Home;