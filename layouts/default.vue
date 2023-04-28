<template>
  <div class="min-h-screen flex flex-col bg-slate-900 text-white">
    <header class="p-3 mx-auto w-full max-w-4xl">
      <nav class="flex gap-3 text-white">
        <NuxtLink to="/" class="underline">Home</NuxtLink>
        <NuxtLink to="/public" class="underline">Public</NuxtLink>
        <NuxtLink to="/private" class="underline hidden">Private</NuxtLink>
        <NuxtLink to="/admin" class="underline hidden">Admin</NuxtLink>
        <NuxtLink
          class="ml-auto text-black py-1 px-2 rounded bg-light-100 hover bg-white"
          to="/login"
        >
          Login
        </NuxtLink>
      </nav>
    </header>
    <main class="p-3 mx-auto w-full max-w-4xl">
      <slot />
    </main>
  </div>
</template>
