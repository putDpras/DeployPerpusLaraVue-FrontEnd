<template>
  <div class="mb-16">
    <div class="drawer">
      <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col">
        <!-- Navbar -->
        <div class="navbar bg-primary w-full fixed z-50">
          <div class="flex-none">
            <label for="my-drawer-3" aria-label="open sidebar" class="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                class="inline-block h-6 w-6 stroke-white">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                </path>
              </svg>
            </label>
          </div>
          <div class="mx-2 flex-1 px-2 text-white"><img :src="imageLogo" alt="" class="size-12 w-max"></div>
          <div class="hidden flex-none lg:block md:block">
            <ul class="menu menu-horizontal text-white">
              <!-- Navbar menu content here -->
              <li>
                <RouterLink to="/">Home</RouterLink>
              </li>
              <li v-if="authStore.tokenUser != null">
                <RouterLink to="/profile">Profile</RouterLink>
              </li>
              <li>
                <RouterLink to="/book">Books</RouterLink>
              </li>
              <li v-if="isAdmin">
                <RouterLink to="/borrow">Borrow</RouterLink>
              </li>
              <li>
                <RouterLink to="/category">Category</RouterLink>
              </li>
              <li v-if="isAdmin">
                <RouterLink to="/role">Roles</RouterLink>
              </li>
              <li v-if="authStore.tokenUser == null">
                <RouterLink to="/login">Login</RouterLink>
              </li>
              <li v-if="authStore.tokenUser != null">
                <RouterLink to="" @click="logoutHandler">Logout</RouterLink>
              </li>
            </ul>
          </div>
        </div>
        <!-- Page content here -->

      </div>
      <div class="drawer-side z-[53]">
        <label for="my-drawer-3" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul>
          <li></li>
        </ul>
        <ul class="menu bg-base-200 min-h-full w-80 p-4">
          <!-- Sidebar content here -->
          <img :src="imageLogo" alt="" class="size-16 w-max">
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li v-if="authStore.tokenUser != null">
            <RouterLink to="/profile">Profile</RouterLink>
          </li>
          <li>
            <RouterLink to="/book">Books</RouterLink>
          </li>
          <li v-if="isAdmin">
            <RouterLink to="/borrow">Borrow</RouterLink>
          </li>
          <li>
            <RouterLink to="/category">Category</RouterLink>
          </li>
          <li v-if="isAdmin">
            <RouterLink to="/role">Roles</RouterLink>
          </li>
          <li v-if="authStore.tokenUser == null">
            <RouterLink to="/login">Login</RouterLink>
          </li>
          <li v-if="authStore.tokenUser != null">
            <RouterLink to="" @click="logoutHandler">Logout</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import imageLogo from "@/assets/Icon.png"
import { watch } from "vue";
import { ref, onMounted, onUpdated } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore()
const { logoutUser, userData } = authStore
const logoutHandler = () => {
  logoutUser()
}

onUpdated(() => {
  isAdmin
})

const isAdmin = ref(false)
watch(() => authStore.userData, (newValue) => {
  isAdmin.value = newValue && newValue.roles.name === 'owner';
}, { immediate: true });

console.log(authStore.tokenUser);
const router = useRoute();
</script>