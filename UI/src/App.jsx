import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header';  
import HomePage from './Pages/HomePage';
import PatrimoinePage from './Pages/PatrimoinePage';
import PossessionsPage from './Pages/PossessionsPage';
import CreatePossessionPage from './Pages/CreerPossessionPage';
import UpdatePossessionPage from './Pages/UpdatePossessionPage';
import NotFoundPage from './Pages/NotFoundPage'; 

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/patrimoine" element={<PatrimoinePage />} />
        <Route path="/possessions" element={<PossessionsPage />} />
        <Route path="/possessions/create" element={<CreatePossessionPage />} />
        <Route path="/possessions/:libelle" element={<UpdatePossessionPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
