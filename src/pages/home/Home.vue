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
    "
  >
    <Card v-for="pet in state.pets" :key="pet.id" v-bind="pet" />
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";

import PetService from "@/services/PetService";

import Card from "@/components/Card";

export default {
  name: "Home",
  components: {
    Card,
  },
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
