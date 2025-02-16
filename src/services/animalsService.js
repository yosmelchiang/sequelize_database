class AnimalsService {
  constructor(db) {
    this.Animals = db.models.Animals;
    this.Species = db.models.Species; //Because this model has a relationship, we want to include Species when querying animals
    this.Users = db.models.Users;

    if (!this.Animals) {
      console.error('Missing Animals model');
    }
  }

  async createNewAnimal(name, SpeciesId, UserId) {
    try {
      await this.Animals.create( {
        name,
        SpeciesId,
        UserId
      })
    } catch(err) {
      console.error('Could not create a new animal', err)
    }
  }

  async getAllAnimals() {
    try {
      const animals = await this.Animals.findAll({
        include: [this.Species, this.Users]
      });
      
      if (animals.length < 1) {
        console.log('The animals table is empty, maybe add some animals? 🐒');
      } else {
        console.log('Found', animals.length, ' Species', JSON.parse(JSON.stringify(animals)));
      }

      return JSON.parse(JSON.stringify(animals));
    } catch (err) {
      console.error('Error in fetching animals:', err);
      throw err;
    }
  }
}

module.exports = new AnimalsService(require('../config/db.js')); //Here we need to pass the db that contains our models to this new instance
