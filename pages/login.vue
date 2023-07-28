<template>
  <div class="">
    <h1 class="">Login Page</h1>
    <p>This page can be accesed by guests</p>
    <LoginForm />
    <LoginCredentials />
  </div>
</template>
<script setup>
definePageMeta({
    middleware: 'guest-only'
})

const user = useAuthUser()

</script>
