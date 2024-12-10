import React from "react";
import Layout from"../components/Layout";

import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <Layout>
      <main>
    <div>
      <h1>Bienvenue dans votre dictionnaire AppliPolyglot</h1>
      <Link to="/ajouter">Ajouter du Vocabulaire dans votre dictionnaire</Link>
      <br/>
      <Link to="/consulter">Consulter votre liste de vocabulaire</Link>
      <br/>
      <Link to="/modifier">Consulter votre liste de vocabulaire</Link>
    </div>
    </main>
    </Layout>
  );
};

export default Home;