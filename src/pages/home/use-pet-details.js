import { onMounted, reactive, inject } from "vue";

import PetService from "@/services/PetService";

import debounce from "lodash/debounce";

export const usePetDetails = () => {
  const user = inject("user");

  const state = reactive({
    pets: [],
    confirmationDialog: {
      open: false,
      title: "",
      message:
        "One of our team members will contact you soon for further details.",
      titleTemplate: "You're going to adopt {name}!",
    },
    addDialog: {
      open: false,
      title: "Add a new pet for adoption",
    },
    editDialog: {
      open: false,
      title: "Edit pet details",
    },
    filteredPets: [],
    dialogType: "",
  });

  onMounted(async () => {
    state.pets = state.filteredPets = await PetService.getList();
  });

  const handleAdoptPet = async ({ id, name }) => {
    // send data to backend
    await PetService.requestAdoption(id);

    state.confirmationDialog.title =
      state.confirmationDialog.titleTemplate.replace("{name}", name);
    state.confirmationDialog.open = true;
    state.dialogType = "confirmationDialog";
  };

  const handleAddPet = () => {
    state.addDialog.pet = {
      name: "",
      description: "",
      photos: [],
      category: "",
      userId: user.id,
    };
    state.addDialog.open = true;
    state.addDialog.btnLabel = "Confirm";
    state.dialogType = "addDialog";
  };

  const handleEditDetails = (id) => {
    state.editDialog.pet = JSON.parse(
      JSON.stringify(state.pets.find((p) => p.id === id))
    );
    state.editDialog.open = true;
    state.editDialog.btnLabel = "Confirm";
    state.dialogType = "editDialog";
  };

  const debouncedSearch = debounce((searchValue) => {
    if (!searchValue) {
      state.filteredPets = state.pets;
    } else {
      state.filteredPets = state.pets.filter((p) =>
        Object.keys(p)
          .filter((k) => typeof p[k] === "string" && k !== "id")
          .some((k) => p[k].toLowerCase().includes(searchValue.toLowerCase()))
      );
    }
  }, 300);

  const handleConfirm = async () => {
    if (state.dialogType === "editDialog") {
      const updatedPet = state[state.dialogType].pet;
      const pet = state.pets.find((p) => p.id === updatedPet.id);
      const oldPet = JSON.parse(JSON.stringify(pet));
      Object.assign(pet, updatedPet);

      PetService.updatePet(updatedPet).catch(() => {
        // revert changes if request failed
        Object.assign(pet, oldPet);
      });
    } else if (state.dialogType === "addDialog") {
      const addedPet = await PetService.addPet(state.addDialog.pet);
      state.pets.push(addedPet);
    }
  };

  return {
    state,
    debouncedSearch,
    handleAddPet,
    handleEditDetails,
    handleAdoptPet,
    handleConfirm,
  };
};
