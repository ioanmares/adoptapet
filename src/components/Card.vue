<template>
  <div
    class="
      relative
      flex flex-wrap
      text-left
      w-4/6
      shadow
      rounded
      border-gray-500
      my-4
      bg-white
    "
  >
    <div class="header p-4 w-full flex">
      <div class="w-full flex items-center">
        <p>
          <b>{{ name }}</b>
        </p>
        <div
          class="
            flex
            ml-2
            p-1
            text-blue-400
            cursor-pointer
            hover:bg-gray-200
            select-none
            rounded
          "
          @click="$emit('edit', id)"
        >
          <Icon>pencil</Icon>
          Edit
        </div>
      </div>
      <div
        class="
          flex
          items-center
          justify-end
          w-full
          text-right text-blue-300
          cursor-pointer
          hover:text-yellow-300
          text-xs
          md:text-lg
        "
      >
        <p v-if="addedByCurrentUser">Added by me</p>
        <p v-else @click="$emit('adopt-pet', { id, name })">
          I want to adopt this pet
        </p>
      </div>
    </div>
    <div class="content px-4 w-full">
      <div class="flex pb-2 overflow-auto">
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
    <div class="footer p-4 w-full"></div>
  </div>
</template>

<script>
import { inject } from "vue";

import Icon from "@/components/Icon";

export default {
  components: {
    Icon,
  },
  props: {
    id: String,
    name: String,
    description: String,
    photos: Array, // contains b64 images
    userId: String,
  },
  setup(props) {
    const currentUser = inject("user");

    const handlePhotoClick = (photo) => {
      fetch(photo)
        .then((response) => response.blob())
        .then((r) => window.open(URL.createObjectURL(r), "_blank"));
    };

    const handleAdoptPet = () => {
      alert("You are going to adopt " + props.name);
    };

    const addedByCurrentUser = props.userId === currentUser.id;

    return {
      handlePhotoClick,
      handleAdoptPet,
      addedByCurrentUser,
    };
  },
};
</script>
