<template>
  <div>
    <header class="w-full bg-slate-100 shadow-md rounded border">
      <nav class="py-7 pl-16">
        <h1 @click="useRouter().push('/')" class="text-3xl font-bold">Where in the world?</h1>
      </nav>
    </header>
    <slot />
  </div>
</template>
