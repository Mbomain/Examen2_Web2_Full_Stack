import React, { useState } from 'react';
import { Table, Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PossessionsTable = ({ possessions, onUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [newPossession, setNewPossession] = useState({
    libelle: '',
    valeur: '',
    dateDebut: '',
    tauxAmortissement: '',
    possesseur: { nom: '' }  
  });

  const navigate = useNavigate();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPossession(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePossesseurChange = (e) => {
    setNewPossession(prev => ({
      ...prev,
      possesseur: { nom: e.target.value }
    }));
  };

  const handleCreate = async () => {
    try {
      const formattedPossession = {
        libelle: newPossession.libelle.trim(),
        valeur: parseFloat(newPossession.valeur),
        dateDebut: newPossession.dateDebut,
        dateFin: null, 
        tauxAmortissement: parseFloat(newPossession.tauxAmortissement),
        possesseur: newPossession.possesseur
      };

      console.log("Données envoyées :", formattedPossession);

      const response = await axios.post('http://localhost:5000/possessions', formattedPossession);
      if (response.status === 201) {
        if (typeof onUpdate === 'function') {
          onUpdate();
        }
        handleCloseModal();
      }
    } catch (error) {
      console.error('Erreur lors de la création de la possession', error.message);
    }
  };

  const handleClosePossession = async (libelle) => {
    try {
      const response = await axios.post(`http://localhost:5000/possessions/${libelle}/close`);
      if (response.status === 200) {
        if (typeof onUpdate === 'function') {
          onUpdate();
        }
      }
    } catch (error) {
      console.error('Erreur lors de la clôture de la possession', error.message);
    }
  };

  const handleEdit = (libelle) => {
    navigate(`/possessions/${libelle}`);
  };

  if (!Array.isArray(possessions)) {
    return <div>No data available</div>; 
  }

  return (
    <div>
      <Button variant="success" className="mb-3" onClick={handleShowModal}>
        Créer une nouvelle Possession
      </Button>

      <Table striped bordered hover responsive="md" className="table-custom">
        <thead>
          <tr className="bg-dark text-white">
            <th>Libellé</th>
            <th>Valeur</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Taux d'Amortissement</th>
            <th>Valeur Actuelle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((poss, index) => (
            <tr key={index} className="table-row">
              <td>{poss.libelle}</td>
              <td>{poss.valeur}</td>
              <td>{new Date(poss.dateDebut).toLocaleDateString()}</td>
              <td>{poss.dateFin ? new Date(poss.dateFin).toLocaleDateString() : 'N/A'}</td>
              <td>{poss.tauxAmortissement}%</td>
              <td>{poss.valeurActuelle}</td>
              <td>
                <Button variant="primary" className="me-2" onClick={() => handleEdit(poss.libelle)}>Modifier</Button>
                <Button variant="danger" onClick={() => handleClosePossession(poss.libelle)}>Clôturer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Creation d'une nouvelle possession */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Créer une nouvelle Possession</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Libellé</Form.Label>
              <Form.Control
                type="text"
                name="libelle"
                value={newPossession.libelle}
                onChange={handleInputChange}
                placeholder="Entrez le libellé"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Valeur</Form.Label>
              <Form.Control
                type="number"
                name="valeur"
                value={newPossession.valeur}
                onChange={handleInputChange}
                placeholder="Entrez la valeur"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date Début</Form.Label>
              <Form.Control
                type="date"
                name="dateDebut"
                value={newPossession.dateDebut}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Taux d'Amortissement</Form.Label>
              <Form.Control
                type="number"
                name="tauxAmortissement"
                value={newPossession.tauxAmortissement}
                onChange={handleInputChange}
                placeholder="Entrez le taux d'amortissement"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nom du Possesseur</Form.Label>
              <Form.Control
                type="text"
                name="possesseurNom"
                value={newPossession.possesseur.nom}
                onChange={handlePossesseurChange}
                placeholder="Entrez le nom du possesseur"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Annuler
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Créer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PossessionsTable;
