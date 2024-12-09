import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Vocabulaire {
    _id: string;
    francais: string;
    anglais: string;
}

const PageModifierMot: React.FC = () => {
    const { id } = useParams<{id: string}>();
    const [vocabulaire, setVocabulaire] = useState<Vocabulaire | null>(null);
    const [francais, setFrancais] = useState<string>("");
    const [anglais, setAnglais] = useState<string>("");
    const [confirmationMessage, setConfirmationMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const navigate = useNavigate();

    const fetchVocabulaire = async () => {
        const response = await fetch(`http://localhost:5000/vocabulaire/${id}`);
        if (!response.ok) {
            setErrorMessage("Erreur lors de la récupération du mot");
            return;
        }
        const data = await response.json();
        setVocabulaire(data);
        setFrancais(data.francais);
        setAnglais(data.anglais);
    };

    const modifierMot = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(`Modifier le mot avec ID: ${id}`);
            const response = await fetch(`http://localhost:5000/vocabulaire/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ francais, anglais }),
            });
            if (!response.ok) {
                throw new Error("Erreur lors de la mise à jour du mot");
            }
            setConfirmationMessage("Mot modifié avec succès !");
            navigate("/consulter"); // Redirection vers la page de consultation
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Une erreur inconnue est survenue.");
        }
    };

    useEffect(() => {
        fetchVocabulaire();
    }, [id]);

    if (!vocabulaire) return <div>Chargement...</div>;

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <h1 style={{ textAlign: "center" }}>Modifier un Mot</h1>
            {confirmationMessage && <p style={{ color: "green" }}>{confirmationMessage}</p>}
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={modifierMot} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                    type="text"
                    value={francais}
                    onChange={(e) => setFrancais(e.target.value)}
                    placeholder="Vocabulaire Français"
                    required
                    style={{ padding: "10px", fontSize: "16px" }}
                />
                <input
                    type="text"
                    value={anglais}
                    onChange={(e) => setAnglais(e.target.value)}
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
                    Modifier
                </button>
            </form>
        </div>
    );
};

export default PageModifierMot;
