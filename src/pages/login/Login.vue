<template>
  <div class="flex flex-col h-full justify-center">
    <Logo />
    <LoginForm />
  </div>
</template>

<script>
import Logo from "@/components/Logo";
import LoginForm from "./LoginForm";

export default {
  name: "Login",
  components: {
    Logo,
    LoginForm,
  },
};
</script>
