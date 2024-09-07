import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Bienvenue sur la plateforme de calcul de patrimoine</h1>
      <p className="text-center">
        Utilisez les liens ci-dessous pour naviguer dans l'application :
      </p>
      <div className="text-center">
        <Link to="/patrimoine">
          <Button variant="primary" className="mx-2">Calculer le Patrimoine</Button>
        </Link>
        <Link to="/possessions">
          <Button variant="secondary" className="mx-2">Voir les Possessions</Button>
        </Link>
      </div>
    </Container>
  );
};

export default HomePage;
