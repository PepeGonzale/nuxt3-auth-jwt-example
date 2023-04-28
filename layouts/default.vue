<template>
    <div class="min-h-screen flex flex-col bg-slate-900">
    <header class=" p-3 mx-auto w-full max-w-4xl">
        <nav class="flex gap-3 text-white">
            <PageLink to="/" class="underline">Home</PageLink>
            <PageLink to="/" class="underline">Public</PageLink>
            <PageLink to="/" class="underline hidden">Private</PageLink>
            <PageLink to="/admin" class="underline hidden">Admin</PageLink>
            <button class="ml-auto text-black py-1 px-2 rounded bg-light-100 hover bg-white">
            Login
        </button>
        </nav>
       
    </header>
    <main p-3 mx-auto w-full max-w-4xl>
      <slot />
    </main>
    </div>
</template>