import { readDataByModel } from './../../data/index.js';

export const getValeurPatrimoine = (req, res) => {
  try {
    const { date } = req.params;
    const patrimoineData = readDataByModel('Patrimoine');

    if (!patrimoineData.length) {
      return res.status(404).json({ message: 'Patrimoine non trouvé' });
    }

    const patrimoine = patrimoineData[0];
    
    // Filtrage des possessions avant de calculer les valeurs pour les possessions qui ont deja dateFin
    const filteredPossessions = patrimoine.possessions.filter(p => !p.dateFin || new Date(p.dateFin) > new Date(date));
    const valeur = filteredPossessions.reduce((acc, possession) => acc + possession.getValeur(new Date(date)), 0).toFixed(2);

    res.status(200).json({ valeur });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du calcul de la valeur du patrimoine', error });
  }
};


const getIntervals = (dateDebut, dateFin, jour) => {
  const startDate = new Date(dateDebut);
  const endDate = new Date(dateFin);
  const intervals = [];

  const patrimoineData = readDataByModel('Patrimoine');
  if (!patrimoineData.length) {
    throw new Error('Patrimoine non trouvé');
  }
  const patrimoine = patrimoineData[0];

  // Filtrage des possessions avant de calculer les valeurs pour les possessions qui ont deja dateFin
  const filteredPossessions = patrimoine.possessions.filter(p => !p.dateFin || new Date(p.dateFin) > endDate);

  let currentDate = startDate;
  while (currentDate <= endDate) {
    const valeur = filteredPossessions.reduce((acc, possession) => acc + possession.getValeur(new Date(currentDate)), 0).toFixed(2);
    intervals.push({
      date: currentDate.toISOString(),
      value: valeur 
    });
    currentDate.setDate(currentDate.getDate() + jour);
  }

  return intervals;
};

export const getValeurPatrimoineRange = (req, res) => {
  const { dateDebut, dateFin, jour } = req.body;

  if (!dateDebut || !dateFin || !jour) {
    return res.status(400).json({ error: 'Paramètres manquants' });
  }

  try {
    const intervals = getIntervals(dateDebut, dateFin, jour);

    if (!Array.isArray(intervals)) {
      throw new Error('Intervals n\'est pas un tableau');
    }

    res.json({ intervals });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};