<template>
  <base-layout>
    <template #default>
      <div class="w-full bg-yellow-200">
        <logo />
      </div>
      <slot />
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from "@/components/BaseLayout";
import Logo from "./Logo.vue";

export default {
  name: "Layout",
  components: {
    BaseLayout,
    Logo,
  },
};
</script>
