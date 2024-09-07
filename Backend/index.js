import express from 'express';
import cors from 'cors';  
import personneRoutes from './Routes/personneRoute.js';
import patrimoineRoutes from './Routes/patrimoineRoute.js';
import possessionRoutes from './Routes/possessionRoute.js';

const app = express();

const corsOptions = {
  origin: ['http://localhost:5000', 'http://192.168.88.242:5000', 'https://front-g2tc.onrender.com'],
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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
