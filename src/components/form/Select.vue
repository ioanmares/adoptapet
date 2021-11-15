<template>
  <div :class="{ flex: true, 'flex-col': labelPosition === 'top' }">
    <label
      v-if="label"
      :class="`
        flex-none
        block
        w-16
        text-gray-700 text-sm
        text-left
        ${labelPosition === 'top' ? 'mb-2' : 'mr-3 mt-2.5'}`"
      :for="name"
    >
      {{ label }}
    </label>
    <div class="flex flex-wrap w-full h-12">
      <div class="relative w-full h-10">
        <select
          :class="`
          block
          text-sm
          appearance-none
          w-full
          h-full
          bg-white
          border
          hover:border-blue-300
          px-4
          py-2
          pr-8
          rounded
          shadow
          leading-tight
          focus:outline-none focus:shadow-outline
          cursor-pointer
          ${error ? 'border-red-500' : ''}`"
          :id="name"
          :placeholder="placeholder"
          v-model="inputValue"
        >
          <option value="" disabled selected hidden>Select an option</option>
          <option v-for="item in items" :value="item.value" :key="item.value">
            {{ item.text }}
          </option>
        </select>
        <div
          class="
            pointer-events-none
            absolute
            inset-y-0
            right-0
            flex
            items-center
            px-2
            text-gray-700
          "
        >
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </div>
      </div>

      <p v-if="error" class="text-red-500 text-xs italic">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "Select",
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Select a value",
    },
    items: {
      type: Array,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [Number, String],
    },
    labelPosition: {
      type: String,
      default: "left",
    },
  },
  setup(props, context) {
    const error = ref("");

    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => {
        error.value = "";
        context.emit("update:modelValue", value);
      },
    });

    const validate = () => {
      const errorMessage = "Please select an option";

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
