import { pets } from "./pets.mock";

const PetService = {
  getList: (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = pets;

        let filteredData = data;

        // mimic server side filtering
        Object.keys(filters).forEach((key) => {
          const filterValue = filters[key];

          filteredData = filteredData.filter((pet) => {
            const currentValue = pet[key];

            if (filterValue instanceof Array) {
              return filterValue.includes(currentValue);
            } else {
              return filterValue === currentValue;
            }
          });
        });

        resolve(filteredData);
      }, 50);
    });
  },
  requestAdoption: () => Promise.resolve(),
  addPet: (pet) =>
    Promise.resolve({
      ...pet,
      id: pets.reduce((counter, currentPet) => {
        if (parseInt(currentPet.id) > counter) {
          counter = parseInt(currentPet.id) + 1;
        }

        return counter;
      }, 0),
    }),
  updatePet: (pet) => Promise.resolve(pet),
};

export default PetService;
