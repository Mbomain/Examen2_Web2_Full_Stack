import React, { useState } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import axios from 'axios';

const CreatePossessionPage = ({ onUpdate }) => {
  const [newPossession, setNewPossession] = useState({
    libelle: '',
    valeur: '',
    dateDebut: '',
    tauxAmortissement: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPossession({ ...newPossession, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/possessions', newPossession);
      if (response.status === 201) {
        if (typeof onUpdate === 'function') {
          onUpdate(); 
        } else {
          console.error('onUpdate n\'est pas une fonction');
        }
      }
    } catch (error) {
      setError('Erreur lors de la création de la possession: ' + error.message);
    }
  };

  return (
    <Container>
      <h2>Créer une nouvelle Possession</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={e => { e.preventDefault(); handleCreate(); }}>
        <Form.Group className="mb-3">
          <Form.Label>Libellé</Form.Label>
          <Form.Control
            type="text"
            name="libelle"
            value={newPossession.libelle}
            onChange={handleChange}
            placeholder="Entrez le libellé"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Valeur</Form.Label>
          <Form.Control
            type="number"
            name="valeur"
            value={newPossession.valeur}
            onChange={handleChange}
            placeholder="Entrez la valeur"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date de Début</Form.Label>
          <Form.Control
            type="date"
            name="dateDebut"
            value={newPossession.dateDebut}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Taux d'Amortissement</Form.Label>
          <Form.Control
            type="number"
            name="tauxAmortissement"
            value={newPossession.tauxAmortissement}
            onChange={handleChange}
            placeholder="Entrez le taux d'amortissement"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Créer
        </Button>
      </Form>
    </Container>
  );
};

export default CreatePossessionPage;
