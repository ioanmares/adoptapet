<template>
  <div class="mx-auto mt-4 w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-8">
        <Input
          ref="inputRef"
          name="username"
          placeholder="Username"
          label="Username"
          v-model="state.username.value"
          :error="state.username.error"
        />
        <Input
          ref="inputRef"
          name="password"
          type="password"
          placeholder="******************"
          label="Password"
          v-model="state.password.value"
          :error="state.password.error"
        />
      </div>
      <div class="flex items-center justify-between">
        <button
          class="
            bg-blue-500
            hover:bg-blue-700
            text-white text-sm
            font-bold
            py-2
            px-4
            rounded
            focus:outline-none focus:shadow-outline
          "
          type="submit"
          @click="handleSignIn"
        >
          Sign In
        </button>
        <a
          class="
            inline-block
            align-baseline
            font-bold
            text-sm text-blue-500
            hover:text-blue-800
          "
          href="#"
        >
          Create an account
        </a>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";

import Input from "./form/Input.vue";

export default {
  name: "LoginForm",
  components: {
    Input,
  },
  setup: () => {
    const state = reactive({
      username: {
        value: "",
        error: "",
      },
      password: {
        value: "",
        error: "",
      },
    });

    const handleSignIn = (e) => {
      e.preventDefault();

      const errorMessage = "Please fill out the required field.";

      state.username.error = !state.username.value ? errorMessage : "";
      state.password.error = !state.password.value ? errorMessage : "";
    };

    return {
      state,
      handleSignIn,
    };
  },
};
</script>
