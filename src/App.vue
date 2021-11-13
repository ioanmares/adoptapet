<template>
  <Layout>
    <template #default>
      <div class="flex flex-col h-full justify-center">
        <Logo />
        <LoginForm />
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from "./components/Layout";
import LoginForm from "./components/LoginForm";
import Logo from "./components/Logo";

export default {
  name: "App",
  components: {
    Logo,
    LoginForm,
    Layout,
  },
};
</script>
