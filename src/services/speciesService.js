class SpeciesService {
  constructor(db) {
    this.Species = db.models.Species;
    if (!this.Species) {
      console.error('Missing Speciels model');
    }
  }

  async getAllSpecies() {
    try {
      const species = await this.Species.findAll();

      if (species.length < 1) {
        console.log('The species table is empty, maybe add some species? ');
      } else {
        console.log('Found ', species.length, ' Species', JSON.parse(JSON.stringify(species)));
      }

      return JSON.parse(JSON.stringify(species));
    } catch (err) {
      console.error('Error in fetching species:', err);
      throw err;
    }
  }
}

module.exports = new SpeciesService(require('../config/db.js')); //Here we need to pass the db that contains our models to this new instance
