<template>
  <p class="text-lg py-2 block">
    <span class="font-medium">{{ property }}: </span>{{ value }}
  </p>
</template>

<script setup>
const { property, value } = defineProps(["property", "value"]);
</script>
