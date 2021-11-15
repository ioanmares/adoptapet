<template>
  <div class="w-4/6 my-2 flex justify-between items-center">
    <Input
      className="border border-green-300 hover:border-blue-300"
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
        p-1
        md:p-2
        bg-white
        text-gray-500
        cursor-pointer
        hover:bg-green-400
      "
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
    @close="state[state.dialogType].open = false"
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
          :items="[
            { text: 'Dog', value: 'dog' },
            { text: 'Cat', value: 'cat' },
          ]"
        />
      </form>
    </div>
  </CustomModal>
</template>

<script>
import Card from "@/components/Card";
import Input from "@/components/form/Input";
import Select from "@/components/form/Select";
import CustomModal from "@/components/CustomModal";

import { usePetDetails } from "@/pages/home/use-pet-details";

export default {
  name: "Home",
  components: {
    Card,
    Input,
    Select,
    CustomModal,
  },
  setup() {
    const {
      state,
      debouncedSearch,
      handleAdoptPet,
      handleEditDetails,
      handleConfirm,
    } = usePetDetails();

    return {
      state,
      handleAdoptPet,
      handleEditDetails,
      handleConfirm,
      debouncedSearch,
    };
  },
};
</script>
