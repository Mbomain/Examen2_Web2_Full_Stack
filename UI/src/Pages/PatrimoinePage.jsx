import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card, Alert } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Charts from '../Components/Chart'; 

const PatrimoinePage = () => {
  const [date, setDate] = useState(new Date());
  const [dateDebut, setDateDebut] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [jour, setJour] = useState(1);
  const [valeur, setValeur] = useState(null);
  const [valeurTotale, setValeurTotale] = useState(null);
  const [error, setError] = useState(null);

  const fetchValeurPatrimoine = async () => {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await axios.get(`/patrimoines/${formattedDate}`);
      setValeur(response.data.valeur);
      setError(null);
    } catch (err) {
      setError('Erreur lors de la récupération de la valeur pour la date spécifique');
    }
  };

  const fetchValeurPatrimoineRange = async () => {
    if (!dateDebut || !dateFin || !jour) {
      setError('Une ou plusieurs valeurs requises ne sont pas définies.');
      return;
    }
  
    try {
      const response = await axios.post('/patrimoines/range', {
        dateDebut: dateDebut.toISOString().split('T')[0],
        dateFin: dateFin.toISOString().split('T')[0],
        jour: jour,
      });
    
      console.log('Données reçues:', response.data);
    
      if (response.status === 200 && response.data && response.data.intervals) {
        setValeurTotale(response.data); 
        setError(null);
      } else {
        setError('Réponse inattendue de l\'API.');
      }
    } catch (error) {
      setError('Erreur lors de la récupération de la valeur pour la plage de dates');
    }
    
  };
  

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Valeur du Patrimoine</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Calcul pour une Date Spécifique</Card.Title>
              <Form.Group controlId="datePicker">
                <Form.Label>Sélectionnez une Date</Form.Label>
                <DatePicker 
                  selected={date} 
                  onChange={setDate} 
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                />
              </Form.Group>
              <Button variant="primary" className="mt-3" onClick={fetchValeurPatrimoine}>
                Obtenir Valeur pour Date
              </Button>
              {valeur !== null && (
                <Card.Text className="mt-3">
                  Valeur du patrimoine pour la date spécifiée : <strong>{valeur}</strong>
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Graphe pour une Plage de Dates</Card.Title>
              <Form.Group controlId="dateRangePicker" className="mb-3">
                <Form.Label>Date de Début</Form.Label>
                <DatePicker 
                  selected={dateDebut} 
                  onChange={setDateDebut} 
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                />
              </Form.Group>
              <Form.Group controlId="dateRangePickerEnd" className="mb-3">
                <Form.Label>Date de Fin</Form.Label>
                <DatePicker 
                  selected={dateFin} 
                  onChange={setDateFin} 
                  className="form-control"
                  dateFormat="yyyy-MM-dd"
                />
              </Form.Group>
              <Form.Group controlId="jourSelect">
                <Form.Label>Sélectionnez le Jour d'interval</Form.Label>
                <Form.Control
                  type="number"
                  value={jour}
                  onChange={(e) => setJour(Number(e.target.value))}
                  min="1"
                />
              </Form.Group>
              <Button variant="success" className="mt-3" onClick={fetchValeurPatrimoineRange}>
                Obtenir Graphe pour Plage
              </Button>
              {valeurTotale && valeurTotale.intervals.length > 0 && (
                <div className="mt-3">
                  <Card.Text>
                    Graphe du patrimoine pour la période :
                  </Card.Text>
                  <Charts data={valeurTotale} />
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PatrimoinePage;
