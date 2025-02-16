const SpeciesService = require('../services/speciesService'); //Import our speciesService

const getAllSpecies = async (req, res) => {
  try {
    const species = await SpeciesService.getAllSpecies();

    res.render('species/viewSpecies', { species })
  } catch (err) {
    console.error('Could not fetch species:', err);
    res.status(500).send('Could not fetch species');
  }
};

module.exports = { getAllSpecies };
