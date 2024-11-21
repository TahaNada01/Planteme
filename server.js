const express = require('express');
const multer = require('multer');
const FormData = require('form-data');  // Nous utiliserons FormData pour envoyer l'image à l'API Plant.id
const axios = require('axios'); // Si vous souhaitez toujours utiliser axios, sinon ce n'est pas nécessaire

const app = express();
const port = 3001;

// Middleware pour gérer le formulaire de données multi-part
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Clé API de Plant.id
const apiKey = 'N5NZ7GkXrrA9hovh8UN6OjfTYQr2Ygc8RnijDdn8YA9gR9EL4o';

// Fonction pour identifier la plante via l'API Plant.id
const getPlantNameByImage = async (imageBuffer) => {
  try {
    // Créer un objet FormData et y ajouter l'image
    const formData = new FormData();
    formData.append('image', imageBuffer, 'image.jpg');

    // Appel à l'API Plant.id pour identifier l'image
    const response = await fetch('https://plant.id/api/v2/identify', {
      method: 'POST',
      headers: {
        'Api-Key': apiKey,
      },
      body: formData,
    });

    const result = await response.json();

    if (result.suggestions && result.suggestions.length > 0) {
      return result.suggestions[0].plant_name;  // Retourne le nom de la plante
    } else {
      throw new Error('Plante non trouvée');
    }
  } catch (error) {
    console.error('Erreur lors de l\'identification de la plante:', error);
    throw new Error('Erreur de traitement de l\'image');
  }
};

// Route pour identifier la plante
app.post('/identify', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer; // L'image reçue dans le formulaire
    const plantName = await getPlantNameByImage(imageBuffer); // Utiliser l'API Plant.id
    res.json({ plantName });
  } catch (error) {
    console.error('Erreur lors de l\'identification de la plante:', error);
    res.status(500).json({ error: error.message });
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on http://10.33.69.215:${port}`);
});
