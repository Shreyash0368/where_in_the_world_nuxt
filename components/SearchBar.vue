<template>
  <div class="my-2 px-10 py-10 h-25 md:flex gap-10 justify-between">
    <div class="relative rounded ">
      <input
        v-model="country"
        type="text"
        placeholder="Enter country name..."
        class="outline-none px-12 py-4 border rounded shadow-md hover:shadow-none w-full"
      />
      <img
        src="../assets/icons/search.svg"
        alt="Search Icon"
        class="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5"
      />
    </div>
    <div class="relative my-2 md:my-0">
      <select
        name="region-selector"
        id="region-selector"
        v-model="region"
        class="outline-none appearance-none rounded shadow-md hover:shadow-none w-full p-4 pr-12"
      >
        <option v-for="o in options" :key="o" :value="o">
          {{ o }}
        </option>
      </select>
      <img
        src="../assets/icons/arrow-down.svg"
        alt="dropdown"
        class="absolute right-4 top-1/2 mx-1 transform -translate-y-1/2 w-3 h-3"
      />
    </div>
  </div>
</template>

<script setup>
const options = ref([
  "Filter By Region",
  "Americas",
  "Asia",
  "Africa",
  "Europe",
  "Antarctic",
  "Oceania",
]);
const country = ref(null);
const region = ref("Filter By Region");

const emit = defineEmits(["countryChange", "regionChange"]);

watch(country, (newValue) => {
  emit("countryChange", newValue);
});
watch(region, (newValue) => {
  emit("regionChange", newValue);
});
</script>

<style scoped></style>
