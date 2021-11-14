<template>
  <div
    class="flex flex-wrap text-left w-4/6 shadow rounded border-gray-500 my-4"
  >
    <div class="header p-4 w-full">{{ name }}</div>
    <div class="content px-4 w-full">
      <div class="flex pb-2">
        <img
          v-for="photo in photos"
          :key="name + photos.indexOf(photo)"
          :src="photo"
          class="w-24 h-24 md:w-40 md:h-40 mr-2 cursor-pointer select-none"
          @click="handlePhotoClick(photo)"
        />
      </div>
      <div class="break-words overflow-auto max-h-200 overscroll-none">
        <p>{{ description }}</p>
      </div>
    </div>
    <div class="footer p-4 w-full">{{ contactNumber }}</div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    description: String,
    photos: Array, // contains b64 images
    contactNumber: String,
  },
  setup() {
    const handlePhotoClick = (photo) => {
      fetch(photo)
        .then((response) => response.blob())
        .then((r) => window.open(URL.createObjectURL(r), "_blank"));
    };

    return {
      handlePhotoClick,
    };
  },
};
</script>
