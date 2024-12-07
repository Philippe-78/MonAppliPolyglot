import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Vocabulaire {
  _id: string;
  francais: string;
  anglais: string;
}

const PageConsulter: React.FC = () => {
  const [vocabulaire, setVocabulaire] = useState<Vocabulaire[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchVocabulaire = async () => {
    try {
      const response = await fetch("http://localhost:5000/vocabulaire");
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération du vocabulaire");
      }
      const data = await response.json();
      setVocabulaire(data);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Une erreur inconnue est survenue.");
    }
  };

  useEffect(() => {
    fetchVocabulaire();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Liste de Vocabulaire</h1>
      <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "20px" }}>
        <Link to="/Home" style={{ marginRight: "20px" }}>Retour à l'accueil</Link>
        <Link to="/ajouter">ajouter du vocabulaire</Link>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} {/* Affiche le message d'erreur si présent */}
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {vocabulaire.map((item) => (
          <li
            key={item._id}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              margin: "5px 0",
            }}
          >
            {item.francais} - {item.anglais}
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "20px" }}>
        <Link to="/Home" style={{ marginRight: "20px" }}>Retour à l'accueil</Link>
        <Link to="/ajouter">ajouter du vocabulaire</Link>
      </div>
    </div>
  );
};

export default PageConsulter;
