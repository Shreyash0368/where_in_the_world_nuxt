<script setup>
const country = ref(null);
const region = ref("Filter By Region");
const filteredData = ref([]);
const countriesData = ref(null);
const error = ref(null);

const handleCountryChange = (newValue) => {
  country.value = newValue;
};
const handleRegionChange = (newValue) => {
  region.value = newValue;
};

onMounted(async () => {
  const { data, error } = await fetchApiData(
    "https://restcountries.com/v3.1/all"
  );
  
  countriesData.value = data.value;
  filteredData.value = data.value;
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
    <ul
      v-if="filteredData.length > 0"
      class="grid gap-8 py-5 px-7 grid-cols-1 md:grid-cols-3 lg:grid-cols-4"
    >
      <!-- Card component-->
      <CountryCard v-for="item in filteredData" :item="item" :key="item.cca3"/>
    </ul>
    <div v-else-if="error"><h1>{{ error }}</h1></div>
    <LoadingSpinner v-else />
  </main>
</template>