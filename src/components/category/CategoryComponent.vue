<template>
    <div class="mb-16 mt-24">
        <div v-if="isAdmin">
            <p class="text-center mt-16 text-3xl font-bold">Tambah Category</p>
            <form class="flex flex-col justify-center mx-32 gap-2 my-2" action="/role" @submit.prevent="handleSubmit">
                <span class="text-center">Category Name</span>
                <label class="input input-bordered flex items-center gap-2 ">
                    <input type="text" class="grow " placeholder="Name" required v-model="category.name" />
                </label>
                <input type="submit" class="btn btn-primary" value="Tambah">
            </form>
        </div>
        <div class="text-center mt-16">
            <p class="text-3xl font-bold">LIST CATEGORY</p>
        </div>
        <div v-if="loading" class="flex justify-center items-center h-screen">
            <span class="loading loading-ring loading-lg"></span>
        </div>
        <div class="flex justify-center mt-4">
            <div class="flex flex-col w-[32rem]">
                <div class="overflow-x-auto">
                    <div class="min-w-full inline-block align-middle">
                        <div class="overflow-hidden">
                            <table class="min-w-full">
                                <thead class="border-b border-gray-200">
                                    <tr>
                                        <th scope="col" class="py-1 group text-start font-normal focus:outline-none">
                                            <div
                                                class="py-1 px-2.5 inline-flex items-center border border-transparent text-sm text-black rounded-md hover:border-gray-200">
                                                Name
                                            </div>
                                        </th>

                                        <th v-if="isAdmin" scope="col"
                                            class="py-2 px-3 text-center font-normal text-sm text-gray-500 --exclude-from-ordering w-36">
                                            Action</th>
                                    </tr>
                                </thead>

                                <tbody class="divide-y divide-gray-200 dark:divide-neutral-700"
                                    v-for="category in categoryStore.arrayCategory">
                                    <tr>
                                        <td class="p-3 whitespace-nowrap text-sm font-medium text-gray-800">
                                            <router-link :to="{name: 'showCategory', params:{id:category.id}}">{{ category.name }}</router-link></td>
                                        <td v-if="isAdmin"
                                            class="p-3 whitespace-nowrap text-end text-sm font-medium flex justify-between">
                                            <button type="button"
                                                class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                                                @click.prevent="handleShowEdit(category.id)">Edit</button>
                                            <button type="button"
                                                class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                                                @click.prevent="handleDelete(category.id)">Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="isEditState">
            <p class="text-center mt-16 text-3xl font-bold">Edit Category "{{ categoryToEdit.value.name }}"</p>
            <form class="flex flex-col justify-center mx-32 gap-2 my-2" action="/role" @submit.prevent="handleEdit(categoryToEdit.value.id)">
                <span>Category Name</span>
                <label class="input input-bordered flex items-center gap-2">
                    <input type="text" class="grow" placeholder="Name" required v-model="categoryToEdit.value.name" />
                </label>
                <input type="submit" class="btn btn-primary" value="Ubah">
            </form>
        </div>

    </div>
</template>
<script setup>
import { useCategoryStore } from '@/stores/categoryStore';
import { onMounted, onUpdated, reactive, ref, watch } from 'vue';
import { useAuthStore } from "@/stores/authStore";
import { param } from 'jquery';
const authStore = useAuthStore()
const categoryStore = useCategoryStore()
const { userData } = authStore
const { indexCategory, storeCategory, deleteCategory, updateCategory } = categoryStore



const loading  = ref(true)
onMounted(async () => {
    await indexCategory();
    loading.value = false;
})

// console.log(genreStore.arrayGenre);

const isAdmin = ref(false)
const category = reactive({
    name: '',
})

const isEditState = ref(false)
const idCategoryToEdit = ref('')

const handleSubmit = () => {
    storeCategory(category);
}

const handleDelete = (role_id) => {
    deleteCategory(role_id);
}

const handleEdit = (role_id) => {
    let formData = new FormData
    formData.append('name', categoryToEdit.value.name)
    updateCategory(formData, role_id)
}

// console.log(authStore.tokenUser);
watch(() => authStore.userData, (newValue) => {
    isAdmin.value = newValue && newValue.roles.name === 'owner';
}, { immediate: true });

const categoryToEdit = reactive({})

const handleShowEdit = (role_id) => {
    isEditState.value = true;
    idCategoryToEdit.value = role_id
    // console.log(role_id);
    for (let i=0; i < categoryStore.arrayCategory.length; i++) {
        if (categoryStore.arrayCategory[i].id === role_id) {
            categoryToEdit.value = categoryStore.arrayCategory[i]
        }
    }
}
</script>