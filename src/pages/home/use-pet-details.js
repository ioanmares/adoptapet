import { onMounted, reactive, inject } from "vue";

import PetService from "@/services/PetService";

import debounce from "lodash/debounce";

export const usePetDetails = () => {
  const user = inject("user");

  const state = reactive({
    pets: [],
    categories: [],
    inputRefs: [],
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

  onMounted(() => {
    PetService.getList().then((pets) => {
      state.pets = state.filteredPets = pets;
    });

    PetService.getCategories().then(
      (categories) => (state.categories = categories)
    );
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

  const isInputValid = () => {
    let isInputValid = true;
    state.inputRefs.forEach((itemRef) => {
      const isValid = itemRef.validate();

      if (isInputValid && !isValid) {
        isInputValid = false;
      }
    });

    return isInputValid;
  };

  const handleConfirm = async () => {
    if (state.dialogType === "editDialog") {
      if (!isInputValid()) {
        return;
      }

      const updatedPet = state[state.dialogType].pet;
      const pet = state.pets.find((p) => p.id === updatedPet.id);
      const oldPet = JSON.parse(JSON.stringify(pet));
      Object.assign(pet, updatedPet);

      PetService.updatePet(updatedPet).catch(() => {
        // revert changes if request failed
        Object.assign(pet, oldPet);
      });
    } else if (state.dialogType === "addDialog") {
      if (!isInputValid()) {
        return;
      }

      PetService.addPet(state.addDialog.pet).then((addedPet) =>
        state.pets.push(addedPet)
      );
    }

    handleClose();
  };

  const handleAddPhoto = (e) => {
    const files = e.target.files;

    if (files.length) {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        state[state.dialogType].pet.photos.push(fileReader.result);
      };

      fileReader.readAsDataURL(files[0]);
    }
  };

  const handleClose = () => {
    state[state.dialogType].open = false;
    state.inputRefs = [];
  };

  const setInputRef = (el) => {
    if (el) {
      state.inputRefs.push(el);
    }
  };

  return {
    state,
    debouncedSearch,
    handleAddPet,
    handleEditDetails,
    handleAdoptPet,
    handleAddPhoto,
    handleConfirm,
    handleClose,
    setInputRef,
  };
};
