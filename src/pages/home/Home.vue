<template>
  <div v-for="pet in state.pets" :key="pet.id">
    {{ pet.name + " " + pet.description }}
  </div>
</template>

<script>
import { onMounted, reactive } from "@vue/runtime-core";

import PetService from "@/services/PetService";

export default {
  name: "Home",
  setup() {
    const state = reactive({ pets: [] });

    onMounted(async () => {
      state.pets = await PetService.getList();
    });

    return {
      state,
    };
  },
};
</script>
