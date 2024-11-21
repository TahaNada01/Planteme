const FormData = require('form-data');

const axios = require('axios');

const apiKey = 'HWXzNbxYVPAJw3sCwX4uEIRRfgBrVYkuTIE4NHgfwyhbawAvOY'; // Remplacez par votre clé API Plant.id

const plantIdApi = axios.create({
  baseURL: 'https://plant.id/api/v3',
  headers: {
    'Api-Key': apiKey,
  },
});

const getPlantNameByImage = async (imageBuffer) => {
  try {
    // Créer un objet FormData et y ajouter l'image
    const formData = new FormData();
    formData.append('image', imageBuffer, 'image.jpg');

    // Appel à l'API Plant.id pour identifier l'image
    const response = await fetch('https://plant.id/api/v3/identify', {
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


// Export de la fonction
module.exports = { getPlantNameByImage };
