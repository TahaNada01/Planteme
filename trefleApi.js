const axios = require('axios');

const apiKey = 'BJuTakuXkBL51DzqvMTMw3Ief8lJl14l2Ye78C0L74o'; // Remplacez par votre clé API

const trefleApi = axios.create({
  baseURL: 'https://trefle.io/api/v1',
  headers: {
    Authorization: `Bearer ${apiKey}`,
  },
});

const getPlantNameByImage = async (imageUri) => {
  try {
    const response = await trefleApi.post('/identify', { image: imageUri });
    if (response.data.data && response.data.data.length > 0) {
      return response.data.data[0].common_name;
    }
    return null;
  } catch (error) {
    console.error('Erreur lors de la récupération des données de la plante:', error);
    return null;
  }
};

// Export de la fonction
module.exports = { getPlantNameByImage };
