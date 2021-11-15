<template>
  <div
    class="
      relative
      overflow-hidden
      flex
      justify-center
      items-center
      animate-reveal
      text-3xl text-green-500
      h-12
      md:text-lg md:h-8
    "
  >
    <div :class="{ 'animate-reveal-first': animate }">Adopt&nbsp;</div>
    <div :class="{ 'animate-reveal-second': animate }">a&nbsp;</div>
    <div :class="{ 'animate-reveal-third': animate }">pet&nbsp;</div>
    <img
      :src="logoImg"
      class="animate-pulse w-9 h-9 md:w-5 md:h-5 mt-1 md:mt-0.5"
    />
  </div>
</template>

<script>
import { logoImg } from "@/assets/icons";

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
      logoImg,
    };
  },
};
</script>
