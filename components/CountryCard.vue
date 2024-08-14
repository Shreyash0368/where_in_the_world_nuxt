<template>
  <div class="countryCard" key="item.cca3" @click="handleClick(item.cca3)">
    <div class="h-1/2">
      <img
        :src="item.flags.png"
        :alt="item.flags.alt"
        class="h-full w-full rounded-t-md"
      />
    </div>
    <div class="p-3 h-1/2">
      <h3 class="font-bold text-xl my-1">{{ item.name.common }}</h3>
      <p><b>Population:</b> {{ item.population }}</p>
      <p><b>Region:</b> {{ item.region }}</p>
      <p v-if="item.capital"><b>Capital:</b> {{ item.capital[0] }}</p>
    </div>
  </div>
</template>

<script setup>
const { item } = defineProps(["item"]);

function handleClick(countryCode) {
  useRouter().push({ name: "code", params: { code: countryCode } });
}
</script>

<style scoped>
.countryCard {
  @apply container mx-auto max-w-64 bg-white rounded-md shadow-md transform transition-transform duration-300 hover:scale-105 max-h-80;
}
</style>
