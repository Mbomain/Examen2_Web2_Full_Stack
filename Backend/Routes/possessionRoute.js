import express from 'express';
import {
  getAllPossessions,
  createPossession,
  updatePossession,
  closePossession
} from '../Controleur/possessionControleur.js';

const router = express.Router();

router.get('/', getAllPossessions);
router.post('/', createPossession);
router.put('/:libelle', updatePossession);
router.post('/:libelle/close', closePossession);

export default router;
