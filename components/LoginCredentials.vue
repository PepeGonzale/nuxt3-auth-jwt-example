<template>
  <div class="w-full max-w-md mx-auto mt-8">
    <div class="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-xl border border-white/20">
      <h3 class="text-lg font-semibold text-white mb-4 text-center">Credenciales de Prueba</h3>
      <div class="space-y-4">
        <div class="bg-blue-500/20 border border-blue-400/50 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span class="font-medium text-blue-200">Usuario Regular</span>
          </div>
          <div class="space-y-1 text-sm text-gray-200">
            <div class="flex items-center gap-2">
              <span class="text-gray-400">Email:</span>
              <code class="bg-black/30 px-2 py-1 rounded text-blue-200">user@gmail.com</code>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-400">Password:</span>
              <code class="bg-black/30 px-2 py-1 rounded text-blue-200">password</code>
            </div>
          </div>
        </div>
        <div class="bg-purple-500/20 border border-purple-400/50 rounded-lg p-4">
          <div class="flex items-center gap-2 mb-2">
            <svg class="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span class="font-medium text-purple-200">Administrador</span>
          </div>
          <div class="space-y-1 text-sm text-gray-200">
            <div class="flex items-center gap-2">
              <span class="text-gray-400">Email:</span>
              <code class="bg-black/30 px-2 py-1 rounded text-purple-200">admin@gmail.com</code>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-gray-400">Password:</span>
              <code class="bg-black/30 px-2 py-1 rounded text-purple-200">password</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
