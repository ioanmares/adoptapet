<template>
  <div
    v-if="open"
    class="
      flex
      items-center
      justify-center
      fixed
      left-0
      bottom-0
      w-full
      h-full
      bg-gray-800 bg-opacity-40
    "
  >
    <div class="bg-white rounded-lg w-1/2">
      <div class="flex flex-col items-start p-4">
        <div class="flex items-center w-full">
          <div class="text-gray-900 font-medium text-sm md:text-lg">
            {{ title }}
          </div>
          <svg
            @click="$emit('close')"
            class="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 18 18"
          >
            <path
              d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
            />
          </svg>
        </div>
        <hr />
        <div class="pt-4 text-xs md:text-lg">
          {{ message }}
          <slot />
        </div>
        <hr />
        <div class="w-full flex justify-center md:justify-end pt-2 md:pt-0">
          <button
            @click="$emit('close')"
            class="
              bg-transparent
              hover:bg-yellow-300
              text-blue-300
              font-semibold
              hover:text-white
              py-2
              px-4
              border border-blue-300
              hover:border-transparent
              rounded
            "
          >
            {{ btnLabel }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomModal",
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    btnLabel: {
      type: String,
      default: "Great!",
    },
  },
};
</script>
