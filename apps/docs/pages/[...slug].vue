<template>
  <main class="content">
    <NuxtLayout>
      <ContentDoc />
    </NuxtLayout>
  </main>
</template>
<style>
.content .shiki {
    @apply p-4 overflow-auto max-w-full text-sm;
}

.content ul {
    @apply list-disc ml-6 my-4;
}
</style>