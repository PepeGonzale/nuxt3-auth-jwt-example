<template>
  <div class="text-white">
    <div class="text-center space-y-8">
      <div class="space-y-4">
        <h1 class="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Nuxt 3 JWT Authentication
        </h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
          Complete JWT authentication example in Nuxt 3. Includes user roles, route protection middleware, and more.
        </p>
      </div>

      <div v-if="authUser" class="mt-12">
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
          <div class="flex items-center justify-center gap-3 mb-4">
            <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <h2 class="text-2xl font-semibold">Active Session</h2>
          </div>
          <div class="space-y-4 text-left">
            <div class="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
              <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div>
                <p class="text-sm text-gray-400">Email</p>
                <p class="font-medium">{{ authUser.email }}</p>
              </div>
            </div>
            <div class="flex items-center gap-3 p-4 bg-white/5 rounded-lg">
              <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
      <div>
                <p class="text-sm text-gray-400">Roles</p>
                <div class="flex gap-2 mt-1">
                  <span 
                    v-for="role in authUser.role" 
                    :key="role"
                    class="px-3 py-1 bg-blue-500/20 border border-blue-400/50 rounded-full text-sm text-blue-200"
                  >
                    {{ role }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="mt-12">
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
          <h2 class="text-2xl font-semibold mb-4">No Active Session</h2>
          <p class="text-gray-300 mb-6">Sign in to access protected pages</p>
          <NuxtLink 
            to="/login"
            class="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Go to Login
          </NuxtLink>
        </div>
      </div>

      <div class="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
          <div class="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">JWT Authentication</h3>
          <p class="text-gray-400 text-sm">Secure authentication system using JSON Web Tokens</p>
        </div>
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
          <div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Role Control</h3>
          <p class="text-gray-400 text-sm">Role system to control access to different pages</p>
        </div>
        <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 hover:bg-white/15 transition-all">
          <div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold mb-2">Middleware</h3>
          <p class="text-gray-400 text-sm">Route protection with custom middleware</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
const {authUser} = await useAuth()
</script>
