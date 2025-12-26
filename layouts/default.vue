<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
    <header class="border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-50">
      <nav class="p-4 mx-auto w-full max-w-6xl">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-6">
            <NuxtLink to="/" class="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-purple-300 transition-all">
              Nuxt3 Auth
            </NuxtLink>
            <div class="hidden md:flex items-center gap-4">
              <NuxtLink 
                to="/" 
                class="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
                active-class="bg-white/10 text-blue-300"
              >
                Home
              </NuxtLink>
              <NuxtLink 
                to="/public" 
                class="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
                active-class="bg-white/10 text-blue-300"
              >
                Public
              </NuxtLink>
              <NuxtLink 
                v-if="authUser" 
                to="/private" 
                class="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium"
                active-class="bg-white/10 text-blue-300"
              >
                Private
              </NuxtLink>
              <NuxtLink 
                v-if="userAdmin" 
                to="/admin" 
                class="px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium flex items-center gap-1"
                active-class="bg-white/10 text-blue-300"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Admin
              </NuxtLink>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div v-if="authUser" class="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
              <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span class="text-sm text-gray-300">{{ authUser.email }}</span>
            </div>
            <div v-if="!authUser" class="flex gap-2">
              <NuxtLink
                to="/register"
                class="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium border border-white/20 transition-all duration-200 text-sm"
              >
                Sign Up
              </NuxtLink>
              <NuxtLink
                to="/login"
                class="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm"
              >
                Login
              </NuxtLink>
            </div>
            <button
              v-else
              @click="handleLogout"
              class="px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
    <main class="flex-1 p-6 mx-auto w-full max-w-6xl">
      <slot />
    </main>
    <footer class="border-t border-white/10 bg-white/5 backdrop-blur-sm py-6 mt-auto">
      <div class="mx-auto w-full max-w-6xl px-4 text-center text-sm text-gray-400">
        <p>Nuxt 3 JWT Authentication Example - Open Source Project</p>
      </div>
    </footer>
  </div>
</template>
<script lang="ts" setup>
const authUser = useAuthUser()
const { userAdmin, logout } = await useAuth()
const router = useRouter()

const handleLogout = async () => {
  await logout()
  await router.push('/login')
}
</script>
