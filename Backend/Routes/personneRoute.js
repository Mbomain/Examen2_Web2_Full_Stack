import express from 'express';
import { getPersonnes, createPersonne } from './../Controleur/personneControleur.js';

const router = express.Router();

router.get('/', getPersonnes);
router.post('/', createPersonne);

export default router;
