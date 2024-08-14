<template>
  <div class="container h-full max-w-screen-2xl">
    <div class="pl-12 py-5 md:my-4">
      <div class="relative bg-white max-w-32 rounded shadow-lg hover:shadow-sm">
        <img
          src="../assets/icons/arrow-left.svg"
          alt="left-arrow"
          class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
        />
        <button
          class="shadow-lg hover:shadow-md py-2 px-12 rounded-md"
          @click="useRouter().go(-1)"
        >
          Back
        </button>
      </div>
    </div>
    <div v-if="item" class="py-8">
      <div class="md:gap-7 md:px-11 lg:flex">
        <!-- image section -->
        <div class="container mb-4 px-4 flex items-center justify-center">
          <img :src="item.flags.png" :alt="item.flags.alt" class="md:min-h-56 lg:h-4/5" />
        </div>
        <!-- text region -->
        <div class="container px-4">
          <h1 class="text-3xl font-bold">{{ item.name.common }}</h1>
          <div class="container py-5 md:text-lg lg:flex lg:gap-8">
            <div class="lg:h-3/5">
              <CardLine property="Native Names" :value="nativeName" />
              <CardLine property="Capital" :value="item?.capital[0]" />
              <CardLine property="Population" :value="item?.population" />
              <CardLine property="Region" :value="item?.region" />
              <CardLine property="Subregion" :value="item?.subregion" />
            </div>
            <div class="lg:w-3/5">
              <CardLine property="TLD" :value="item.tld[0]" />
              <CardLine
                property="Languages"
                :value="
                  Object.keys(item.languages)
                    .map((key) => item.languages[key])
                    .join(', ')
                "
              />
              <CardLine property="Currency" :value="currenyText" />
            </div>
          </div>
          <div class="flex gap-3 flex-wrap">
            <div class="text-lg py-2 font-bold">Borders:</div>
            <div
              v-if="item.borders && item.borders.length > 0"
              v-for="border in item.borders"
              class="py-2 px-3 bg-white border rounded shadow-sm"
            >
              {{ border }}
            </div>
            <div v-else class="py-2 text-lg">No Borders</div>
          </div>
        </div>
      </div>
    </div>
    <LoadingSpinner v-else />
  </div>
</template>

<script setup>
const { code } = useRoute().params;
const item = ref(null);
const nativeName = ref(null);
const currenyText = ref("None");

onMounted(async () => {
  const response = await $fetch(
    `https://restcountries.com/v3.1/alpha?codes=${code}`
  );
  item.value = response[0];
  const nativeNameKeys = Object.keys(item.value.name.nativeName);
  nativeName.value = nativeNameKeys
    .map((key) => item.value.name.nativeName[key].common)
    .join(", ");
  const currencyObj =
    item.value.currencies[Object.keys(item.value.currencies)[0]];

  if (currencyObj) {
    currenyText.value = `${currencyObj.name} (${currencyObj.symbol})`;
  }
});
</script>

<style scoped></style>
