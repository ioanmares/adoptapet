<template>
  <div class="w-4/6 my-2 flex justify-between items-center">
    <Input
      className="border hover:border-blue-300"
      name="search"
      placeholder="Search for a pet.."
      @change="debouncedSearch"
    />
    <div
      class="
        ml-4
        mr-3
        mb-1.5
        text-xs
        md:text-sm
        rounded
        shadow
        p-1
        md:p-2
        bg-white
        text-blue-300
        cursor-pointer
        hover:bg-yellow-200
      "
      @click="handleAddPet"
    >
      Add a new pet
    </div>
  </div>
  <div
    class="
      absolute
      top-14
      bottom-0
      overflow-auto
      w-full
      flex flex-col
      items-center
    "
  >
    <div v-if="!state.filteredPets.length">
      <strong>No pets found.</strong>
    </div>
    <Card
      v-for="pet in state.filteredPets"
      :key="pet.id"
      v-bind="pet"
      @adopt-pet="handleAdoptPet"
      @edit="handleEditDetails"
    />
  </div>
  <CustomModal
    v-if="state.dialogType"
    v-bind="state[state.dialogType]"
    @close="handleClose"
    @confirm="handleConfirm"
  >
    <div
      v-if="['addDialog', 'editDialog'].includes(state.dialogType)"
      class="flex flex-col px-2 mb-8 min-w-250 md:min-w-400"
    >
      <form>
        <Input
          name="name"
          label="Name"
          required
          v-model="state[state.dialogType].pet.name"
          class="mb-4"
          labelPosition="top"
        />
        <Input
          name="description"
          label="Description"
          required
          v-model="state[state.dialogType].pet.description"
          class="mb-4"
          labelPosition="top"
        />
        <Select
          name="category"
          label="Category"
          required
          v-model="state[state.dialogType].pet.category"
          labelPosition="top"
          class="mb-4"
          :items="state.categories"
        />
        <div class="flex pb-2 overflow-auto max-w-250 md:max-w-400">
          <img
            v-for="photo in state[state.dialogType].pet.photos"
            :key="
              state[state.dialogType].pet.name +
              state[state.dialogType].pet.photos.indexOf(photo)
            "
            :src="photo"
            class="w-16 h-16 md:w-32 md:h-32 mr-2 cursor-pointer select-none"
            @click="handlePhotoClick(photo)"
          />
          <div
            class="
              relative
              flex flex-shrink-0
              w-16
              h-16
              md:w-32 md:h-32
              border
              rounded-lg
              justify-center
              items-center
              text-gray-300
              hover:border-blue-300 hover:text-blue-300
              select-none
            "
          >
            <input
              title=""
              type="file"
              class="absolute opacity-0 w-full h-full cursor-pointer"
              @change="handleAddPhoto"
            />
            <Icon size="medium">add</Icon>
          </div>
        </div>
      </form>
    </div>
  </CustomModal>
</template>

<script>
import Card from "@/components/Card";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import CustomModal from "@/components/CustomModal";

import Icon from "@/components/Icon";

import { usePetDetails } from "@/pages/home/use-pet-details";

export default {
  name: "Home",
  components: {
    Card,
    Input,
    Select,
    CustomModal,
    Icon,
  },
  setup() {
    const {
      state,
      debouncedSearch,
      handleAdoptPet,
      handleAddPet,
      handleEditDetails,
      handleConfirm,
      handleClose,
    } = usePetDetails();

    const handlePhotoClick = (photo) => {
      fetch(photo)
        .then((response) => response.blob())
        .then((r) => window.open(URL.createObjectURL(r), "_blank"));
    };

    const handleAddPhoto = (e) => {
      const files = e.target.files;

      if (files.length) {
        const fileReader = new FileReader();

        fileReader.onload = () => {
          state[state.dialogType].pet.photos.push(fileReader.result);
        };

        fileReader.readAsDataURL(files[0]);
      }
    };

    return {
      state,
      handleAdoptPet,
      handleAddPet,
      handleEditDetails,
      handleConfirm,
      handleClose,
      debouncedSearch,
      handlePhotoClick,
      handleAddPhoto,
    };
  },
};
</script>
