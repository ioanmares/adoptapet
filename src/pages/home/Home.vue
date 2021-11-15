<template>
  <div class="w-4/6 my-2">
    <Input
      className="border border-green-300 hover:border-blue-300"
      name="search"
      placeholder="Search for a pet.."
      @change="debouncedSearch"
    />
  </div>
  <div
    class="
      absolute
      top-14
      bottom-0
      overflow-auto
      w-full
      flex flex-col
      items-center
    "
  >
    <div v-if="!state.filteredPets.length">
      <strong>No pets found.</strong>
    </div>
    <Card
      v-for="pet in state.filteredPets"
      :key="pet.id"
      v-bind="pet"
      @adopt-pet="handleAdoptPet"
    />
  </div>
  <CustomModal
    v-if="state.dialogType"
    v-bind="state[state.dialogType]"
    @close="state[state.dialogType].open = false"
  >
    <div v-if="['addDialog', 'editDialog'].includes(state.dialogType)"></div>
  </CustomModal>
</template>

<script>
import { onMounted, reactive } from "vue";

import PetService from "@/services/PetService";

import Card from "@/components/Card";
import Input from "@/components/form/Input";
import CustomModal from "@/components/CustomModal";

import debounce from "lodash/debounce";

export default {
  name: "Home",
  components: {
    Card,
    Input,
    CustomModal,
  },
  setup() {
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

    const debouncedSearch = debounce((searchValue) => {
      if (!searchValue) {
        state.filteredPets = state.pets;
      } else {
        state.filteredPets = state.pets.filter((p) =>
          Object.keys(p)
            .filter((k) => typeof p[k] === "string")
            .some((k) => p[k].toLowerCase().includes(searchValue.toLowerCase()))
        );
      }
    }, 300);

    return {
      state,
      handleAdoptPet,
      debouncedSearch,
    };
  },
};
</script>
