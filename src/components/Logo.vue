<template>
  <div
    class="
      relative
      overflow-hidden
      flex
      justify-center
      align-items-center
      animate-reveal
      text-lg text-green-500
    "
  >
    <div :class="{ 'animate-reveal-first': animate }">Adopt&nbsp;</div>
    <div :class="{ 'animate-reveal-second': animate }">a&nbsp;</div>
    <div :class="{ 'animate-reveal-third': animate }">pet&nbsp;</div>
    <img :src="icons.pet64" class="animate-pulse w-6 h-6 mt-0.5" />
  </div>
</template>

<script>
import { icons } from "@/assets/icons";

export default {
  name: "Logo",
  props: {
    animate: {
      type: Boolean,
      default: true,
    },
  },
  setup() {
    return {
      icons,
    };
  },
};
</script>
