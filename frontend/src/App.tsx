import React, { useState, useEffect } from 'react';

interface Vocabulaire {
  _id: string;
  francais: string;
  anglais: string;
}

const App: React.FC = () => {
  const [francais, setFrancais] = useState<string>('');
  const [anglais, setAnglais] = useState<string>('');
  const [vocabulaire, setVocabulaire] = useState<Vocabulaire[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<string | null>(null);

  const fetchVocabulaire = async () => {
    const response = await fetch('http://localhost:5000/vocabulaire');
    const data = await response.json();
    setVocabulaire(data);
  };

  const ajouterVocabulaire = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('http://localhost:5000/vocabulaire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ francais, anglais }),
    });
    fetchVocabulaire(); // Rafraîchir la liste après ajout
    resetForm();
  };

  const modifierVocabulaire = async (id: string) => {
    await fetch(`http://localhost:5000/vocabulaire/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ francais, anglais }),
    });
    fetchVocabulaire(); // Rafraîchir la liste après modification
    resetForm();
  };

  const supprimerVocabulaire = async (id: string) => {
    await fetch(`http://localhost:5000/vocabulaire/${id}`, {
      method: 'DELETE',
    });
    fetchVocabulaire(); // Rafraîchir la liste après suppression
  };

  const resetForm = () => {
    setFrancais('');
    setAnglais('');
    setIsEditing(false);
    setCurrentId(null);
  };

  const handleEdit = (item: Vocabulaire) => {
    setFrancais(item.francais);
    setAnglais(item.anglais);
    setIsEditing(true);
    setCurrentId(item._id);
  };

  useEffect(() => {
    fetchVocabulaire();
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>MonAppliPolyglot</h1>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (isEditing && currentId) {
          modifierVocabulaire(currentId);
        } else {
          ajouterVocabulaire(e);
        }
      }} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          value={francais}
          onChange={(e) => setFrancais(e.target.value)}
          placeholder="Vocabulaire Français"
          required
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input
          type="text"
          value={anglais}
          onChange={(e) => setAnglais(e.target.value)}
          placeholder="Traduction Anglaise"
          required
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px', fontSize: '16px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          {isEditing ? 'Modifier' : 'Ajouter'}
        </button>
      </form>
      <h2 style={{ textAlign: 'center' }}>Liste de vocabulaire</h2>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {vocabulaire.map((item) => (
          <li key={item._id} style={{ padding: '10px', border: '1px solid #ccc', margin: '5px 0' }}>
            {item.francais} - {item.anglais}
            <button onClick={() => handleEdit(item)} style={{ marginLeft: '10px', backgroundColor: '#2196F3', color: 'white', border: 'none', cursor: 'pointer' }}>
              Modifier
            </button>
            <button onClick={() => supprimerVocabulaire(item._id)} style={{ marginLeft: '10px', backgroundColor: '#F44336', color: 'white', border: 'none', cursor: 'pointer' }}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
