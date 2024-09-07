import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Patrimoine from '../models/Patrimoine.js';
import Possession from '../models/possessions/Possession.js';
import Personne from '../models/Personne.js';

// Détermine le répertoire de base et le chemin du fichier de données
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, 'data.json');

// Fonction pour lire toutes les données
export const readAllData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Erreur lors de la lecture du fichier:", error);
    return [];
  }
};

const convertToInstances = (data) => {
  return data.map(entry => {
    if (entry.model === 'Patrimoine') {
      const possessions = entry.data.possessions.map(possessionData => {
        const dateDebut = new Date(possessionData.dateDebut);
        const dateFin = possessionData.dateFin ? new Date(possessionData.dateFin) : null;

        const possession = new Possession(
          possessionData.possesseur instanceof Object ? new Personne(possessionData.possesseur.nom) : possessionData.possesseur,
          possessionData.libelle,
          possessionData.valeur,
          dateDebut,
          dateFin,
          possessionData.tauxAmortissement
        );
        
        console.log('Converted Possession:', possession);

        return possession;
      });

      const possesseur = entry.data.possesseur instanceof Object ? new Personne(entry.data.possesseur.nom) : entry.data.possesseur;
      const patrimoine = new Patrimoine(possesseur, possessions);

      console.log('Converted Patrimoine:', patrimoine);

      return patrimoine;
    }
    
    if (entry.model === 'Personne') {
      const personne = new Personne(entry.data.nom);
      console.log('Converted Personne:', personne);

      return personne;
    }
    return entry;
  });
};

export const readDataByModel = (modelName) => {
  try {
    // Lire toutes les données
    const allData = readAllData();
    console.log('Données lues:', allData);

    // Convertir les données en instances
    const convertedData = convertToInstances(allData);
    console.log('Données converties:', convertedData);

    // Filtrer les données par modèle
    if (modelName === 'Personne') {
      const personnes = convertedData.filter(entry => entry instanceof Personne);
      console.log('Personnes trouvées:', personnes);
      return personnes;
    }

    if (modelName === 'Patrimoine') {
      const patrimoines = convertedData.filter(entry => entry instanceof Patrimoine);
      console.log('Patrimoines trouvés:', patrimoines);
      return patrimoines;
    }

    console.warn(`Modèle ${modelName} non reconnu.`);
    return [];
  } catch (error) {
    console.error(`Erreur lors de la lecture des données pour le modèle ${modelName}:`, error);
    return [];
  }
};

export const writeDataByModel = (model, data) => {
  let existingData = [];

  if (fs.existsSync(dataFilePath)) {
    existingData = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
  }

  const index = existingData.findIndex(item => item.model === model);
  if (index > -1) {
    existingData[index] = {
      model: model,
      data: data
    };
  } else {
    existingData.push({
      model: model,
      data: data
    });
  }

  fs.writeFileSync(dataFilePath, JSON.stringify(existingData, null, 2), 'utf8');
};
