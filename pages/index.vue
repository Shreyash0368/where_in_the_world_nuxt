<script setup>
const country = ref(null);
const region = ref("Filter By Region");
const countriesData = ref([]);
const filteredData = ref([]);
const router = useRouter();

const options = ref([
  "Filter By Region",
  "Americas",
  "Asia",
  "Africa",
  "Europe",
  "Antarctic",
  "Oceania",
]);

function debounce(fn, delay) {
  let timeoutID;
  return function (...args) {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn.apply(this, args), delay);
  };
}

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

watch(
  country,
  debounce((newValue) => {
    if (newValue === "") {
      filteredData.value = countriesData.value;
    } else {
      const regex = new RegExp(newValue, "i");
      filteredData.value = countriesData.value.filter(
        (obj) => regex.test(obj.name.official) || regex.test(obj.name.common)
      );
    }
  }, 600)
);

function handleClick(countryCode) {
  router.push({ name: "code", params: { code: countryCode } });
}
</script>

<template>
  <main>
    <!-- Serach Space -->
    <div class="my-2 p-3 px-10 h-25 md:flex gap-10 justify-between">
      <div class="my-2 md:my-0 lg:my-0">
        <input
          type="text"
          id="country-search"
          name="country-search"
          v-model="country"
          class="outline-none rounded-md shadow-lg p-4 hover:shadow-sm"
          placeholder="Enter country name"
        />
      </div>
      <div class="my-2 md:my-0 lg:my-0">
        <select
          name="region-selector"
          id="continet"
          v-model="region"
          class="outline-none p-4 rounded-md shadow-md"
        >
          <option v-for="o in options" :key="o" :value="o">
            {{ o }}
          </option>
        </select>
      </div>
    </div>
    <!-- Card grid-->
    <div class="grid  lg:grid-cols-4 md:grid-cols-3 sm: grid-cols-1 gap-10 p-5">
      <!-- Card component-->
      <div
        class="countryCard"
        v-for="item in filteredData"
        key="item.cca3"
        @click="handleClick(item.cca3)"
      >
        <div class="h-1/2">
          <img
            :src="item.flags.png"
            :alt="item.flags.alt"
            class="h-full w-full rounded-t-md"
          />
        </div>
        <div class="p-3 h-1/2">
          <h3 class="font-bold text-xl">{{ item.name.common }}</h3>
          <p>Population: {{ item.population }}</p>
          <p>Region: {{ item.region }}</p>
          <p v-if="item.capital">Capital: {{ item.capital[0] }}</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.countryCard {
  @apply container bg-white rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 max-h-80;
}
</style>
