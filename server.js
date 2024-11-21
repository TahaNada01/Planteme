const express = require('express');
const multer = require('multer');
const path = require('path');
const { getPlantNameByImage } = require('./trefleApi');  // Utilisation du bon chemin relatif

const app = express();
const port = 3001;

// Middleware pour gérer le formulaire de données multi-part
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Route pour identifier la plante
app.post('/identify', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer; // L'image reçue dans le formulaire
    // Si vous avez besoin d'envoyer cette image au service d'API, vous pouvez le faire ici
    const plantName = await getPlantNameByImage(imageBuffer);
    res.json({ plantName });
  } catch (error) {
    console.error('Erreur lors de l\'identification de la plante:', error);
    res.status(500).json({ error: 'Erreur lors du traitement de l\'image' });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on http://10.33.69.215:${port}`);
});
