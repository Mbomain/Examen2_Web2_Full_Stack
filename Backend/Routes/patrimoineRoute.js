import express from 'express';
import {
  getValeurPatrimoine,
  getValeurPatrimoineRange
} from '../Controleur/patrimoineControleur.js';

const router = express.Router();

router.get('/:date', getValeurPatrimoine);
router.post('/range', getValeurPatrimoineRange);

export default router;
