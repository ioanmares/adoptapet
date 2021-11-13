<template>
  <div class="flex mb-4">
    <label
      v-if="label"
      class="block text-gray-700 text-sm font-bold mr-3 mt-2.5"
      :for="name"
    >
      {{ label }}
    </label>
    <div class="flex flex-wrap">
      <input
        :class="`w-full
              shadow
              appearance-none
              border
              rounded
              py-2
              px-3
              text-gray-700
              leading-tight
              focus:outline-none focus:shadow-outline
              ${error ? 'border-red-500' : ''}`"
        :id="name"
        :type="type"
        :placeholder="placeholder"
        v-model="inputValue"
      />
      <p v-if="error" class="text-red-500 text-xs italic mt-3">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/reactivity";
export default {
  name: "Input",
  props: {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [Number, String],
    },
  },
  setup(props, context) {
    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        context.emit("update:modelValue", value);
      },
    });

    const error = ref("");

    const validate = () => {
      const errorMessage = "Please fill out the required field";

      error.value = !inputValue.value && props.required ? errorMessage : "";

      return error.value ? false : true;
    };

    return {
      inputValue,
      error,
      validate,
    };
  },
};
</script>
