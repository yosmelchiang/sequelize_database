class Animals {
  constructor(AnimalsService, SpeciesService) {
    this.AnimalsService = AnimalsService
    this.SpeciesService = SpeciesService
  }

  getAllAnimals = async (req, res) => {
    try {
      const animals = await this.AnimalsService.getAllAnimals();
      res.render('animals/viewAnimals', { animals })
      // res.send(animals)
    } catch (err) {
      console.error('Could not fetch animals', err);
      res.status(500).send('Could not fetch species');
    }
  };
  
  addAnimalsPage = async (req, res) => {
    const species = await this.SpeciesService.getAllSpecies();
    res.render('animals/addAnimal', { species: species })
  }
  
  //Services
  createNewAnimal = async(req, res) => {
    const { name, species, UserId} = req.body;
    console.log('name:', name)
    console.log('species:', species)
    console.log('UserId:', UserId)
    await this.AnimalsService.createNewAnimal(name, species, UserId)
    res.redirect('/animals')
  }
}


module.exports = new Animals(require('../services/animalsService.js'), require('../services/speciesService.js'));