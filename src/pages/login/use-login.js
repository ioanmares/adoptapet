import { reactive } from "vue";

import { useRouter } from "vue-router";

export const useLogin = () => {
  const router = useRouter();

  const state = reactive({
    username: "",
    password: "",
    refs: [],
  });

  const setItemRef = (el) => {
    if (el) {
      state.refs.push(el);
    }
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    let isInputValid = true;
    state.refs.forEach((itemRef) => {
      const isValid = itemRef.validate();

      if (isInputValid && !isValid) {
        isInputValid = false;
      }
    });

    if (isInputValid) {
      localStorage.setItem("is-authenticated", "true");
      router.replace({ name: "Home" });
    }
  };

  return {
    state,
    setItemRef,
    handleSignIn,
  };
};
