<template>
    <div>

        <body class="bg-gray-100 lg:min-h-screen flex items-center justify-center">

            <div class="bg-white p-8 rounded shadow-md max-w-md w-full mx-auto ">
                <h2 class="text-2xl font-semibold mb-4">Profile</h2>

                <form action="/profile" @submit.prevent="handlerUpdateProfile">
                    <!-- Nom et Prénom -->

                    <!-- Adresse email -->
                    <div class="mt-4">
                        <label for="age" class="block text-sm font-medium text-gray-700">Age</label>
                        <input type="text" id="age" name="age" class="mt-1 p-2 w-full border rounded-md"
                            v-model="authStore.userData.profile.age">
                    </div>

                    <!-- Mot de passe -->
                    <br>
                    <span>Biodata</span>
                    <div class="mt-4 flex">

                        <textarea class="textarea textarea-bordered w-96 " placeholder="Biodata"
                            v-model="authStore.userData.profile.bio">
                        </textarea>
                    </div>

                    <!-- Bouton d'inscription -->
                    <div class="mt-6">
                        <button type="submit"
                            class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">Update
                            Profile</button>
                    </div>
                </form>
            </div>

        </body>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const authStore = useAuthStore()
const { updateNama, createOrUpdateProfile } = authStore
// const userInput = reactive({
//     age: "",
//     address: "",
//     bio: ""
// })

if (authStore.userData.profile == null) {
    authStore.userData.profile = {
        age: "",
        bio: ""
    }
}
import { useToast } from 'vue-toastification';
const toast = useToast();

const handlerUpdateProfile = async () => {
    try {
        let formData = new FormData
        formData.append('age', authStore.userData.profile.age)
        formData.append('bio', authStore.userData.profile.bio)

        await createOrUpdateProfile(formData)

        // console.log(formData);
        router.push('profile');
        toast.success("Berhasil Ubah Profile", {
            position: "top-right",
            timeout: 3005,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: "button",
            icon: true,
            rtl: false
        });
    } catch (error) {
        console.log(error);
    }

}
</script>