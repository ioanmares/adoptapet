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
    <div class="bg-white rounded-lg min-w-250 max-w-4/6">
      <div class="flex flex-col items-start p-4">
        <div class="flex items-center justify-between w-full">
          <div class="text-gray-900 font-medium text-sm md:text-lg">
            {{ title }}
          </div>
          <Icon class="cursor-pointer" @click="$emit('close')">close</Icon>
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
import Icon from "@/components/Icon";

export default {
  components: { Icon },
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
