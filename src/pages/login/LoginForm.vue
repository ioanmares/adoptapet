<template>
  <div class="mx-auto mt-4 w-full max-w-xs">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-8">
        <!-- <Select
          :ref="setItemRef"
          name="category"
          label="Category"
          :items="[{ text: 'Gigel', value: 'Are mere' }]"
          required
          v-model="state.category"
        /> -->
        <Input
          :ref="setItemRef"
          name="username"
          placeholder="Username"
          label="Username"
          required
          v-model="state.username"
        />
        <Input
          :ref="setItemRef"
          name="password"
          type="password"
          placeholder="******************"
          label="Password"
          required
          v-model="state.password"
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
import Input from "@/components/form/Input";

import { useLogin } from "./use-login";

export default {
  name: "LoginForm",
  components: {
    Input,
  },
  setup() {
    const { state, setItemRef, handleSignIn } = useLogin();

    return {
      state,
      handleSignIn,
      setItemRef,
    };
  },
};
</script>
