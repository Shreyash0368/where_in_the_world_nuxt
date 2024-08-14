<script setup>
const country = ref(null);
const region = ref("Filter By Region");
const countriesData = ref([]);
const filteredData = ref([]);

const handleCountryChange = (newValue) => {
  country.value = newValue;
};
const handleRegionChange = (newValue) => {
  region.value = newValue;
};

onMounted(async () => {
  countriesData.value = await $fetch("https://restcountries.com/v3.1/all");
  filteredData.value = countriesData.value;
});

watch(region, () => {
  if (region.value === "Filter By Region") {
    filteredData.value = countriesData.value;
  } else {
    filteredData.value = countriesData.value.filter(
      (country) => country.region === region.value
    );
  }
});

watch(country, (newValue) => {
  if (newValue === "") {
    filteredData.value = countriesData.value;
  } else {
    const regex = new RegExp(newValue, "i");
    filteredData.value = countriesData.value.filter(
      (obj) => regex.test(obj.name.official) || regex.test(obj.name.common)
    );
  }
});
</script>

<template>
  <main class="max-w-screen-2xl mx-auto">
    <!-- Serach Space -->
    <SearchBar
      @regionChange="handleRegionChange"
      @countryChange="handleCountryChange"
    />
    <!-- Card grid-->
    <div
    v-if="filteredData.length > 0"
      class="grid gap-10 py-5 px-7 grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
    >
      <!-- Card component-->
      <CountryCard  v-for="item in filteredData" :item="item" />
    </div>
    <LoadingSpinner v-else />
  </main>
</template>

<style scoped></style>
