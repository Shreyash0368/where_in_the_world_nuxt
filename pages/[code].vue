<template>
  <div class="container h-full p-7">
    <div class="p-5 h-1/5">
      <button
        class="bg-white shadow-md hover:shadow-sm py-2 px-6 rounded-md"
        @click="useRouter().go(-1)"
      >
        Back
      </button>
    </div>
    <div v-if="item" class="md:flex gap-7 h-3/5">
      <div class="container p-4 flex items-center justify-center ">
        <img
          :src="item.flags.png"
          :alt="item.flags.alt"
          class="lg:h-3/5"
        />
      </div>
      <div class="container p-5 lg:flex md:text-lg font-bold">
        <div class="lg:w-3/5">
          <p>Name: {{ item.name.common }}</p>
          <p>Capital: {{ item?.capital[0] }}</p>
          <p>Population: {{ item?.population }}</p>
          <p>Region: {{ item?.region }}</p>
          <p>Subregion: {{ item?.subregion }}</p>
          <div v-if="item.borders" class="mt-8 flex flex-wrap">
            Borders:
            <span
              class="bg-white rounded-md py-1 px-2 mx-2 my-1"
              v-for="b in item.borders"
              >{{ b }}</span
            >
          </div>
        </div>
        <div class="lg:w-2/5">
          <p>Native Name: {{ nativeName }}</p>
          <p>TLD: {{ item.tld[0] }}</p>
          <p>
            Languages:
            {{
              Object.keys(item.languages)
                .map((key) => item.languages[key])
                .join(", ")
            }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { code } = useRoute().params;
const item = ref(null);
const nativeName = ref(null);

onMounted(async () => {
  const response = await $fetch(
    `https://restcountries.com/v3.1/alpha?codes=${code}`
  );
  item.value = response[0];
  const nativeNameKeys = Object.keys(item.value.name.nativeName);
  nativeName.value = nativeNameKeys.map(key => item.value.name.nativeName[key].common).join(", ");
});
</script>

<style scoped>
p {
  display: block;
  margin: 20px 0;
}
</style>
