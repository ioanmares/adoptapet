<template>
  <div :class="{ flex: true, 'flex-col': labelPosition === 'top' }">
    <label
      v-if="label"
      :class="`block flex-none w-20 text-left text-gray-700 text-sm ${
        labelPosition === 'top' ? 'mb-2' : 'mr-3 mt-2.5'
      }`"
      :for="name"
    >
      {{ label }}
    </label>
    <div class="flex flex-col h-12">
      <input
        :class="`w-full
              shadow
              h-10
              appearance-none
              border
              rounded
              py-2
              px-3
              text-sm
              text-gray-700
              leading-tight
              hover:border-blue-300
              focus:outline-none focus:shadow-outline
              focus:border-blue-300
              ${error ? 'border-red-500' : ''} 
              ${className}`"
        :id="name"
        :type="type"
        :placeholder="placeholder"
        v-model="inputValue"
        @change="(e) => e.stopPropagation()"
      />
      <p v-if="error" class="text-red-500 text-xs italic text-left">
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
    className: {
      type: String,
      default: "",
    },
    labelPosition: {
      type: String,
      default: "left",
    },
  },
  setup(props, context) {
    const errorMessage = "Please fill out the required field";

    const error = ref("");

    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        error.value = value.length === 0 && props.required ? errorMessage : "";
        context.emit("update:modelValue", value);
        context.emit("change", value);
      },
    });

    const validate = () => {
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
