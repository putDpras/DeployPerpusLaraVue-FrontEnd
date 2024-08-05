<template>
    <div class="flex justify-center mt-24 mb-16">
        <div class="p-5 border rounded text-center text-gray-500 max-w-sm">
            <!-- <img class="w-32 h-32 rounded-full mx-auto" src="https://loremflickr.com/320/320/girl" alt=""> -->

            <svg xmlns="http://www.w3.org/2000/svg" class=" h-36 w-36 rounded-full mx-auto bg-slate-800"
                viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
            </svg>
            <div class="text-sm mt-5">
                <a href="#"
                    class="font-medium leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out">
                    {{ userData.name }}
                </a>
                <p>Bergabung sejak {{ userData.created_at.slice(0, 4) }}</p>
                
            </div>
            <p class="mt-2 text-sm text-gray-900 text-justify">Contact: </p>
            <p>{{ userData.email }} </p>
            <p class="mt-2 text-sm text-gray-900 text-justify">Age: </p>
            <p v-if="userData.profile != null">{{ userData.profile.age }}</p>
            <p class="mt-2 text-sm text-gray-900 text-justify">Biodata: </p>
            <p v-if="userData.profile != null">{{ userData.profile.bio }}</p>
            <div class="mt-16">
                <router-link to="/editProfile" class="font-bold mt-16"><button class="btn btn-primary font-bold">Update
                        Profile </button></router-link>
            </div>
        </div>  
    </div>

</template>
<script setup>
import { useAuthStore } from '@/stores/authStore';
import { onMounted } from 'vue';
const authStore = useAuthStore()
const { userData, getUser } = authStore
getUser()
console.log(userData.profile);
</script>