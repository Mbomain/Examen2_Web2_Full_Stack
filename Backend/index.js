import express from 'express';
import cors from 'cors';  
import personneRoutes from './Routes/personneRoute.js';
import patrimoineRoutes from './Routes/patrimoineRoute.js';
import possessionRoutes from './Routes/possessionRoute.js';

const app = express();

const corsOptions = {
  origin: 'https://front-g2tc.onrender.com', 
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API');
});

app.use('/personnes', personneRoutes);
app.use('/patrimoines', patrimoineRoutes);
app.use('/possessions', possessionRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur interne du serveur' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
