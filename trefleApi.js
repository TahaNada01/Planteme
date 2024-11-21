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
    // Préparation des données à envoyer
    const formData = new FormData();
    formData.append('images', imageBuffer, 'image.jpg'); // Ajoute l'image au formulaire

    // Optionnel : Ajoutez des données supplémentaires si nécessaire
    formData.append('organs', 'leaf'); // Exemple : indique que c'est une feuille
    formData.append('include-related-images', 'true');

    // Requête POST vers l'API
    const response = await plantIdApi.post('/identify', formData, {
      headers: formData.getHeaders(), // Ajoute les en-têtes nécessaires pour le FormData
    });

    // Traitement de la réponse
    if (response.data.suggestions && response.data.suggestions.length > 0) {
      return response.data.suggestions[0].plant_name; // Retourne le nom de la plante
    }
    return null; // Aucune plante trouvée
  } catch (error) {
    console.error('Erreur lors de la récupération des données de la plante:', error);
    return null;
  }
};

// Export de la fonction
module.exports = { getPlantNameByImage };
