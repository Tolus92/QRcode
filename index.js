const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const containerRoutes = require('./routes/containerRoutes');
const containerRoutes = require('C:\\Users\\nnato\\Desktop\\Nowa\\Projet QR\\Projet QRCode\\routes\\containerRoutes');
const productRoutes = require('C:\\Users\\nnato\\Desktop\\Nowa\\Projet QR\\Projet QRCode\\routes\\productRoutes');
const qrCodeRoutes = require('C:\\Users\\nnato\\Desktop\\Nowa\\Projet QR\\Projet QRCode\\routes\\qrCodeRoutes');

const app = express();
// Configuration de bodyParser pour parser les requêtes en JSON
router.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
router.use(bodyParser.json());

// Configuration de la connexion à la base de données
mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur lors de la connexion à la base de données'));
db.once('open', () => {
  console.log('Connecté à la base de données');
});

// Configuration des routes
app.use('/api/containers', containerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/qr-codes', qrCodeRoutes);

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Le serveur est démarré sur le port 3000');
});