<template>
    <div class="mt-[-2rem]">
        <div class="min-h-screen flex items-center justify-center w-full bg-gray-100">
            <div class="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 class="text-2xl font-bold text-center mb-4 text-black">Welcome Back!</h1>
                <form action="/" @submit.prevent="handleAuth()">
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email
                            Address</label>
                        <input type="email" id="email"
                            class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="your@email.com" required v-model="userInput.email">
                    </div>
                    <div class="mb-4">
                        <label for="password"
                            class="block text-sm font-medium text-gray-700  mb-2">Password</label>
                        <input type="password" id="password"
                            class="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password" required v-model="userInput.password">
                    </div>
                    <div class="flex items-center justify-between mb-4">

                        <router-link  to="/register"
                            class="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create
                            Account</router-link>
                    </div>
                    <button type="submit"
                        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { reactive } from 'vue';
const userInput = reactive({
    email: "",
    password: ""
})

const authStore = useAuthStore()

const { loginUser } = authStore

const handleAuth = () => {
    loginUser(userInput)
}
</script>