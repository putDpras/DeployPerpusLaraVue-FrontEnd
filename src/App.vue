<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavbarComponent from '@/components/Navbar.vue'
</script>

<template>
  <NavbarComponent/>
  <RouterView v-slot="{ Component, route }">
      <transition name="scale" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </RouterView>
</template>

<style scoped>
.scale-enter-active,
.scale-leave-active {
  transition: all 0.75s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>

