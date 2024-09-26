import express from 'express';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const app = express();

// Pour remplacer __dirname dans les ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve les fichiers statiques de l'app frontend (React, Vue, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Proxy pour les requêtes REST envoyées au backend Go
app.use('/api', (req, res) => {
  const url = `http://localhost:8080${req.url}`; // Backend Go écoute sur le port 8080
  axios({
    method: req.method,
    url: url,
    data: req.body
  })
    .then(response => res.json(response.data))
    .catch(err => res.status(err.response?.status || 500).json(err.response?.data || { error: 'Internal Server Error' }));
});

// Rediriger toutes les autres routes vers l'index.html (pour gérer les routes côté frontend)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Lancer le serveur Express
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Serveur Express lancé sur le port ${PORT}`);
});
