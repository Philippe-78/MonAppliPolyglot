import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

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

    const effacerMot = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:5000/vocabulaire/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la suppression du mot");
            }
            fetchVocabulaire(); // Rafraîchir la liste après suppression
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Une erreur inconnue est survenue.");
        }
    };

    useEffect(() => {
        fetchVocabulaire();
    }, []);

    return (
        <Layout>
        <div>
            <h1>Liste de Vocabulaire</h1>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <ul>
                {vocabulaire.map((item) => (
                    <li key={item._id}>
                        {item.francais} - {item.anglais}
                        <Link to={`/modifier/${item._id}`} style={{ marginLeft: "10px" }}>Corriger</Link>
                        
                        <button onClick={() => effacerMot(item._id)} style={{ marginLeft: "10px", color: "red" }}>
                            Effacer
                        </button>
                    </li>
                ))}
            </ul>
            <Link to={`/`} style={{ marginLeft: "10px" }}>Accueil</Link>
        </div>
        </Layout>
    );
};

export default PageConsulter;
