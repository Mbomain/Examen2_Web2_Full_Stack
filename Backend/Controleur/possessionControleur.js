import { readDataByModel, writeDataByModel } from '../../data/index.js';
import Possession from '../../models/possessions/Possession.js';
import Personne from '../../models/Personne.js';

export const getAllPossessions = (req, res) => {
  try {
    const patrimoineData = readDataByModel('Patrimoine');

    if (!patrimoineData.length) {
      return res.status(404).json({ message: 'Aucune possession trouvée' });
    }
    const patrimoine = patrimoineData[0];
    const possessionsAvecValeur = patrimoine.possessions.map(poss => {
      const possession = new Possession(
        poss.possesseur,
        poss.libelle,
        poss.valeur,
        new Date(poss.dateDebut),
        poss.dateFin ? new Date(poss.dateFin) : null,
        poss.tauxAmortissement
      );
      const valeurActuelle = possession.getValeur(new Date());
      return {
        ...poss,
        valeurActuelle
      };
    });

    res.status(200).json(possessionsAvecValeur);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des possessions', error });
  }
};

export const createPossession = (req, res) => {
  try {
    const newPossessionData = req.body;

    console.log('Données reçues pour la création de possession:', newPossessionData);

    // Vérifiez la présence des champs requis
    const { libelle, valeur, dateDebut, tauxAmortissement, possesseur, dateFin } = newPossessionData;

    if (!libelle || !valeur || !dateDebut || !tauxAmortissement || !possesseur || !possesseur.nom) {
      console.log('Champs manquants dans les données reçues');
      return res.status(400).json({ message: 'Les champs libelle, valeur, dateDebut, tauxAmortissement et possesseur sont requis' });
    }

    // Lire les données du modèle Patrimoine
    const patrimoineData = readDataByModel('Patrimoine');

    if (!patrimoineData.length) {
      console.log('Patrimoine non trouvé');
      return res.status(404).json({ message: 'Patrimoine non trouvé' });
    }

    const patrimoine = patrimoineData[0];

    // Vérifiez que 'data' et 'possessions' existent et sont bien définis
    if (!patrimoine || !patrimoine.possessions || !Array.isArray(patrimoine.possessions)) {
      console.log('La structure des données du patrimoine est incorrecte');
      return res.status(500).json({ message: 'Erreur dans la structure des données du patrimoine' });
    }

    // Créez une nouvelle instance de Possession
    const newPossession = new Possession(
      new Personne(possesseur.nom),
      libelle,
      valeur,
      new Date(dateDebut),
      dateFin ? new Date(dateFin) : null,
      tauxAmortissement
    );

    console.log('Nouvelle possession créée:', newPossession);

    // Ajoutez la nouvelle possession au patrimoine
    patrimoine.possessions.push(newPossession);

    // Écrire les données mises à jour
    writeDataByModel('Patrimoine', patrimoine);

    res.status(201).json({
      model: 'Patrimoine',
      data: patrimoine
    });
  } catch (error) {
    console.error('Erreur lors de la création de la possession:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la possession', error });
  }
};






export const updatePossession = (req, res) => {
  try {
    const { libelle } = req.params;
    const { dateFin, nouveauLibelle } = req.body;

    if (!dateFin && !nouveauLibelle) {
      return res.status(400).json({ message: 'Aucune donnée à mettre à jour' });
    }

    const patrimoineData = readDataByModel('Patrimoine');

    if (!patrimoineData.length) {
      return res.status(404).json({ message: 'Patrimoine non trouvé' });
    }

    const patrimoine = patrimoineData[0];
    const possession = patrimoine.possessions.find(p => p.libelle.toLowerCase() === libelle.toLowerCase());

    if (!possession) {
      return res.status(404).json({ message: 'Possession non trouvée' });
    }

    if (dateFin) {
      possession.dateFin = new Date(dateFin);
    }

    if (nouveauLibelle) {
      possession.libelle = nouveauLibelle;
    }

    writeDataByModel('Patrimoine', patrimoine);

    res.status(200).json(possession);
  } catch (error) {
    console.error('Error during update:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la possession', error });
  }
};


export const closePossession = (req, res) => {
  try {
    const { libelle } = req.params;
    const patrimoineData = readDataByModel('Patrimoine');
    if (!patrimoineData.length) {
      return res.status(404).json({ message: 'Patrimoine non trouvé' });
    }
    const patrimoine = patrimoineData[0];
    const possession = patrimoine.possessions.find(p => p.libelle.toLowerCase() === libelle.toLowerCase());

    if (!possession) {
      return res.status(404).json({ message: 'Possession non trouvée' });
    }
    possession.dateFin = new Date().toISOString();
    writeDataByModel('Patrimoine', patrimoine);

    res.status(200).json(possession);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la clôture de la possession', error });
  }
};
