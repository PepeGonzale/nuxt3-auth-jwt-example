<template>
    <div>
        <div class="text-center text-white">
            <h1>Public</h1>
            <div>
                This page can be accessed by anyone
                <span>current user: {{ authUser.email }}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
const {authUser} = await useAuth()

</script>