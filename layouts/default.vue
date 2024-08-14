<template>
  <div>
    <header class="w-full bg-slate-100 shadow-md rounded border">
      <nav class="py-7 px-8">
        <h1 @click="useRouter().push('/')" class="text-3xl font-bold">Where in the world?</h1>
      </nav>
    </header>
    <NuxtLoadingIndicator />

    <slot />
  </div>
</template>
