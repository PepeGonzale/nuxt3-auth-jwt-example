<template>
  <div class="space-y-8">
    <div class="text-center space-y-2">
      <div class="flex items-center justify-center gap-2">
        <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Public Page
        </h1>
      </div>
      <p class="text-gray-300">This page can be accessed by anyone</p>
    </div>

    <div class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 max-w-2xl mx-auto">
      <div class="space-y-6">
        <div class="text-center">
          <h2 class="text-2xl font-semibold mb-4">Session Status</h2>
          <div v-if="authUser" class="space-y-4">
            <div class="flex items-center justify-center gap-2">
              <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span class="text-lg font-medium">Active Session</span>
            </div>
            <div class="bg-white/5 rounded-lg p-4">
              <p class="text-sm text-gray-400 mb-1">Current user:</p>
              <p class="text-lg font-semibold">{{ authUser.email }}</p>
            </div>
            <div class="flex gap-2 justify-center">
              <span 
                v-for="role in authUser.role" 
                :key="role"
                class="px-3 py-1 bg-blue-500/20 border border-blue-400/50 rounded-full text-sm text-blue-200"
              >
                {{ role }}
              </span>
            </div>
          </div>
          <div v-else class="space-y-4">
            <div class="flex items-center justify-center gap-2">
              <div class="w-3 h-3 bg-gray-400 rounded-full"></div>
              <span class="text-lg font-medium text-gray-400">No active session</span>
            </div>
            <p class="text-gray-400">You are not currently authenticated</p>
            <NuxtLink 
              to="/login"
              class="inline-block px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Sign In
            </NuxtLink>
          </div>
        </div>

        <div class="border-t border-white/10 pt-6">
          <div class="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p class="text-sm font-medium text-blue-200 mb-1">Information</p>
                <p class="text-sm text-gray-300">
                  This is a public page that can be accessed by anyone, 
                  regardless of whether they are authenticated or not. You can freely 
                  navigate this page without needing to sign in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const authUser = useAuthUser()
</script>