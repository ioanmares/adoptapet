<template>
  <div ref="slotRef" class="hidden">
    <slot />
  </div>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path :d="svgPath" />
  </svg>
</template>

<script>
import { computed, ref } from "vue";

import { icons } from "@/assets/icons";

export default {
  setup() {
    const slotRef = ref(null);

    const svgPath = computed(() => icons[slotRef.value?.textContent] || "");

    return {
      slotRef,
      svgPath,
    };
  },
};
</script>
