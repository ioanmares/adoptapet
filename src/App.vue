<template>
  <component :is="layout">
    <template #default>
      <router-view />
    </template>
  </component>
</template>

<script>
import { watch, ref, provide } from "vue";

import BaseLayout from "@/layout/BaseLayout";
import Layout from "@/layout/Layout";

export default {
  name: "App",
  components: {
    BaseLayout,
    Layout,
  },
  setup() {
    const loggedIn = ref(localStorage.getItem("is-authenticated") === "true");

    const loginSuccessfulCallback = () => (loggedIn.value = true);

    provide("loginSuccessfulCallback", loginSuccessfulCallback);

    const layout = ref(loggedIn.value ? "layout" : "base-layout");

    watch(
      () => loggedIn.value,
      (isLoggedIn) => {
        layout.value = isLoggedIn ? "layout" : "base-layout";
      }
    );

    return { layout };
  },
};
</script>
