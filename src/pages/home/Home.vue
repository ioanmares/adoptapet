<template>
  <div
    class="
      absolute
      top-0
      bottom-0
      overflow-auto
      w-full
      flex flex-col
      items-center
      mt-2
    "
  >
    <Card
      v-for="pet in state.pets"
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

import ConfirmationDialog from "@/components/ConfirmationDialog";

export default {
  name: "Home",
  components: {
    Card,
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
    });

    onMounted(async () => {
      state.pets = await PetService.getList();
    });

    const handleAdoptPet = async ({ id, name }) => {
      // send data to backend
      await PetService.requestAdoption(id);

      state.dialog.title = state.dialog.titleTemplate.replace("{name}", name);
      state.dialog.open = true;
    };

    return {
      state,
      handleAdoptPet,
    };
  },
};
</script>
