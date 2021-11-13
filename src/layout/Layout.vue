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
import BaseLayout from "@/layout/BaseLayout";
import Logo from "@/components/Logo.vue";

export default {
  name: "Layout",
  components: {
    BaseLayout,
    Logo,
  },
};
</script>
