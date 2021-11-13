<template>
  <Layout>
    <template #default>
      <router-view />
    </template>
  </Layout>
</template>

<script>
import Layout from "@/components/Layout";

export default {
  name: "App",
  components: {
    Layout,
  },
};
</script>
