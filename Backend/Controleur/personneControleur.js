import { readDataByModel, writeDataByModel } from '../../data/index.js';

export const getPersonnes = (req, res) => {
  try {
    const personnes = readDataByModel('Personne');
    console.log('Personnes:', personnes);
    res.json(personnes);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des personnes', error });
  }
};

export const createPersonne = (req, res) => {
  try {
    const newPersonne = req.body;

    if (!newPersonne.nom || !newPersonne.prenom) {
      return res.status(400).json({ message: 'Les champs nom et prénom sont requis' });
    }

    const personnes = readDataByModel('Personne');
    personnes.push(newPersonne);

    writeDataByModel('Personne', personnes);

    res.status(201).json(newPersonne);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la personne', error });
  }
};
