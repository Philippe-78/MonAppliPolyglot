import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Vocabulaire {
  _id: string;
  francais: string;
  anglais: string;
}

const PageAjouter: React.FC = () => {
  const [francais, setFrancais] = useState<string>("");
  const [anglais, setAnglais] = useState<string>("");
  const [, setVocabulaire] = useState<Vocabulaire[]>([]);
  const [confirmationMessage, setConfirmationMessage] = useState<string>("");

  const fetchVocabulaire = async () => {
    const response = await fetch("http://localhost:5000/vocabulaire");
    const data = await response.json();
    setVocabulaire(data);
  };

  const ajouterVocabulaire = async (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmationMessage("");
    await fetch("http://localhost:5000/vocabulaire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ francais, anglais }),
    });
     fetchVocabulaire(); // Rafraîchir la liste après ajout
     resetForm();
     setConfirmationMessage("Mot ajouté avec succès !"); 
  };

  const resetForm = () => {
    setFrancais("");
    setAnglais("");
  };

  useEffect(() => {
    fetchVocabulaire();
  }, []);

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Ajouter du vocabulaire</h1>
      <form
        onSubmit={ajouterVocabulaire}
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
      >
        <input
          type="text"
          value={francais}
          onChange={(e) => setFrancais(e.target.value)}
          onFocus={() => setConfirmationMessage("")}
          placeholder="Vocabulaire Français"
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <input
          type="text"
          value={anglais}
          onChange={(e) => setAnglais(e.target.value)}
          onFocus={() => setConfirmationMessage("")}
          placeholder="Traduction Anglaise"
          required
          style={{ padding: "10px", fontSize: "16px" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Ajouter
        </button>
      </form>
      {confirmationMessage && <p style={{ color: "green" }}>{confirmationMessage}</p>}
      <div style={{ display: "flex", justifyContent: "flex-start", marginTop: "20px" }}>
        <Link to="/Home" style={{ marginRight: "20px" }}>Retour à l'accueil</Link>
        <Link to="/consulter">Consulter la liste</Link>
      </div>
   
   </div>
  )
}

export default PageAjouter;
