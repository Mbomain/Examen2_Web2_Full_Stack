import React, { useState, useEffect } from 'react';
import { Button, Form, Container, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatePossessionPage = () => {
  const { libelle } = useParams();
  const [poss, setPoss] = useState(null);
  const [formData, setFormData] = useState({
    dateFin: '',
    nouveauLibelle: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPossession = async () => {
      try {
        const response = await axios.get('http://localhost:5000/possessions');
        const filteredPoss = response.data.find(p => p.libelle === libelle);

        if (filteredPoss) {
          setPoss(filteredPoss);
          setFormData({
            dateFin: filteredPoss.dateFin ? new Date(filteredPoss.dateFin).toISOString().split('T')[0] : '',
            nouveauLibelle: filteredPoss.libelle
          });
        } else {
          setError('Possession non trouvée');
        }
      } catch (error) {
        setError('Erreur lors de la récupération de la possession');
        console.error(error);
      }
    };

    fetchPossession();
  }, [libelle]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const { dateFin, nouveauLibelle } = formData;

    const dataToSend = {};
    if (dateFin) {
      dataToSend.dateFin = dateFin;
    }
    if (nouveauLibelle) {
      dataToSend.nouveauLibelle = nouveauLibelle;
    }

    console.log('Data to send:', dataToSend);

    if (Object.keys(dataToSend).length === 0) {
      setError('Aucune donnée à mettre à jour.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/possessions/${encodeURIComponent(libelle)}`, dataToSend);
      console.log('Response:', response.data);
      navigate('/possessions');
    } catch (error) {
      console.error('Error during update:', error.response ? error.response.data : error.message);
      setError('Erreur lors de la mise à jour de la possession');
    }
  };

  return (
    <Container>
      <h2>Modifier la possession</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {poss && (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Libellé</Form.Label>
            <Form.Control
              type="text"
              name="nouveauLibelle"
              value={formData.nouveauLibelle}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date Fin</Form.Label>
            <Form.Control
              type="date"
              name="dateFin"
              value={formData.dateFin}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Mettre à jour
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default UpdatePossessionPage;
