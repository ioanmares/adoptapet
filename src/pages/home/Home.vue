<template>
  <div class="w-4/6 my-2 z-1 bg-white">
    <Input
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
  <ConfirmationDialog
    v-bind="state.dialog"
    @close="state.dialog.open = false"
  />
</template>

<script>
import { onMounted, reactive } from "vue";

import PetService from "@/services/PetService";

import Card from "@/components/Card";
import Input from "@/components/form/Input";
import ConfirmationDialog from "@/components/ConfirmationDialog";

import debounce from "lodash/debounce";

export default {
  name: "Home",
  components: {
    Card,
    Input,
    ConfirmationDialog,
  },
  setup() {
    const state = reactive({
      pets: [],
      dialog: {
        open: false,
        title: "",
        message:
          "One of our team members will contact you soon for further details.",
        titleTemplate: "You're going to adopt {name}!",
      },
      filteredPets: [],
    });

    onMounted(async () => {
      state.pets = state.filteredPets = await PetService.getList();
    });

    const handleAdoptPet = async ({ id, name }) => {
      // send data to backend
      await PetService.requestAdoption(id);

      state.dialog.title = state.dialog.titleTemplate.replace("{name}", name);
      state.dialog.open = true;
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
