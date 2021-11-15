<template>
  <div>
    <div ref="slotRef" class="hidden">
      <slot />
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="{
        'h-5': size === 'small',
        'w-5': size === 'small',
        'w-7': size === 'medium',
        'h-7': size === 'medium',
      }"
      :viewBox="size === 'small' ? '0 0 20 20' : '0 0 22 22'"
      fill="currentColor"
      stroke="currentColor"
    >
      <path :d="svgPath" />
    </svg>
  </div>
</template>

<script>
import { computed, ref } from "vue";

import { icons } from "@/assets/icons";

export default {
  props: {
    size: {
      type: String,
      default: "small",
    },
  },
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
