<template>
  <li
    class="bg-white rounded-md shadow-sm transform transition-transform duration-300 hover:scale-105 max-h-96"
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
      <h3 class="font-bold text-xl my-3">{{ item.name.common }}</h3>
      <p><span class="font-medium">Population:</span> {{ item.population }}</p>
      <p><span class="font-medium">Region:</span> {{ item.region }}</p>
      <p v-if="item.capital"><span class="font-medium">Capital:</span> {{ item.capital[0] }}</p>
    </div>
  </li>
</template>

<script setup>
const { item } = defineProps(["item"]);

function handleClick(countryCode) {
  useRouter().push({ name: "code", params: { code: countryCode } });
}
</script>
