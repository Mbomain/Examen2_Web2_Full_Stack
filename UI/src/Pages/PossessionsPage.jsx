import React, { useState, useEffect } from 'react';
import PossessionsTable from './../Components/PossessionsTable';
import axios from 'axios';

const PossessionsPage = () => {
  const [possessions, setPossessions] = useState([]);

  const fetchPossessions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/possessions');
      setPossessions(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des possessions', error.message);
    }
  };

  useEffect(() => {
    fetchPossessions();
  }, []);

  const handleUpdate = () => {
    fetchPossessions();
  };

  return (
    <div>
      <PossessionsTable possessions={possessions} onUpdate={handleUpdate} />
    </div>
  );
};

export default PossessionsPage;
