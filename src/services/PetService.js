import { MaxPhotos } from "@/assets/images/Max";

const PetService = {
  getList: (filters = {}) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = [
          {
            id: "1",
            name: "Max",
            category: "dog",
            description:
              "Max is a 2 years old bulldog. He is very playful and knows a trick or two when it comes to eating your pizza.",
            photos: MaxPhotos,
            userId: "9ecd874c-d410-4917-ad68-1acd1f0bbe90",
          },
          {
            id: "2",
            name: "Ollie",
            category: "cat",
            description:
              "Ollie is a 5 years old abyssinian. He enjoys surprising people when they least expect it. It is definitely a pick if you want a big laugh.",
            photos: [],
          },
          {
            id: "3",
            name: "Max",
            category: "dog",
            description:
              "Max is a 2 years old bulldog. He is very playful and knows a trick or two when it comes to eating your pizza.",
            photos: MaxPhotos,
            userId: "9ecd874c-d410-4917-ad68-1acd1f0bbe90",
          },
          {
            id: "4",
            name: "Max",
            category: "dog",
            description:
              "Max is a 2 years old bulldog. He is very playful and knows a trick or two when it comes to eating your pizza.",
            photos: MaxPhotos,
            userId: "9ecd874c-d410-4917-ad68-1acd1f0bbe90",
          },
          {
            id: "5",
            name: "Max",
            category: "dog",
            description:
              "Max is a 2 years old bulldog. He is very playful and knows a trick or two when it comes to eating your pizza.",
            photos: MaxPhotos,
            userId: "9ecd874c-d410-4917-ad68-1acd1f0bbe90",
          },
          {
            id: "6",
            name: "Max",
            category: "dog",
            description:
              "Max is a 2 years old bulldog. He is very playful and knows a trick or two when it comes to eating your pizza.",
            photos: MaxPhotos,
            userId: "9ecd874c-d410-4917-ad68-1acd1f0bbe90",
          },
        ];

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
};

export default PetService;
