<template>
    <div>
        <div v-if="loading" class="flex justify-center items-center h-screen">
            <span class="loading loading-ring loading-lg"></span>
        </div>
        <div v-if="!loading" class="max-w-6xl mx-auto px-4 py-8 sm:px-6 md:py-12">
            <div class="grid md:grid-cols-2 gap-8 items-start">
                <div class="flex justify-center">
                    <img :src="bookStore.book.image" alt="Book Cover" width="400" height="600"
                        class="rounded-lg shadow-lg" />
                </div>

                <!-- Detail Buku -->
                <div class="grid gap-6">
                    <div>
                        <h1 class="text-3xl font-bold">{{ bookStore.book.title }}</h1>
                    </div>
                    <div class="prose max-w-none">
                        <p class="text-justify">
                            {{ bookStore.book.summary }}
                        </p>
                    </div>
                    <div class="flex items-center gap-4">
                        <span class="badge badge-secondary">
                            in stock
                        </span>
                        <div class="text-muted-foreground">
                            <span class="font-medium">{{ bookStore.book.stok }}</span> copies available
                        </div>
                    </div>
                    <div class="flex gap-4">
                        <!-- <button class="btn btn-primary h-4">Pinjam</button> -->

                        <router-link v-if="isAdmin" to="/book"><button class="btn btn-error h-4"
                                @click.prevent="handleDelete">Hapus</button></router-link>

                    </div>

                    <!-- Form Pinjam -->
                    <div class="bg-white p-8 rounded shadow-md max-w-sm w-full mx-auto "
                        v-if="authStore.tokenUser != null">
                        <h2 class="text-2xl font-semibold mb-4">Form Pinjam Buku</h2>

                        <form action="/book" @submit.prevent="handleSubmitPinjam">
                            <div class="mt-4">
                                <label for="load_date" class="block text-sm font-medium text-gray-700">Load Date</label>
                                <input type="date" id="load_date" name="load_date" v-model="inputData.load_date">
                            </div>

                            <div class="mt-4">
                                <label for="barrow_date" class="block text-sm font-medium text-gray-700">Barrow
                                    Date</label>
                                <input type="date" id="barrow_date" name="barrow_date" v-model="inputData.barrow_date">
                            </div>

                            <div class="mt-4">
                                <label for="stok" class="block text-sm font-medium text-gray-700">Book ID</label>
                                <input type="stok" id="stok" name="stok" class="mt-1 p-2 w-full border rounded-md"
                                    disabled v-model="bookStore.book.id">
                            </div>

                            <div class="mt-6">
                                <button type="submit"
                                    class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                    Pinjam </button>
                            </div>
                        </form>
                    </div>


                    <!-- Form Edit -->
                    <div class="bg-white p-8 rounded shadow-md max-w-sm mx-auto" v-if="isAdmin">
                        <h2 class="text-2xl font-semibold mb-4">Edit Buku</h2>

                        <form action="/book" @submit.prevent="handleSubmit">
                            <div class="mt-4">
                                <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                                <input type="text" id="title" name="title" class="mt-1 p-2 w-full border rounded-md"
                                    v-model="bookStore.book.title">
                            </div>

                            <br>
                            <span>Summary</span>
                            <div class="mt-4 flex">
                                <textarea class="textarea textarea-bordered w-96 " placeholder="Summary"
                                    v-model="bookStore.book.summary">
                        </textarea>
                            </div>

                            <div class="mt-4">
                                <label for="stok" class="block text-sm font-medium text-gray-700">Stok</label>
                                <input type="stok" id="stok" name="stok" class="mt-1 p-2 w-full border rounded-md"
                                    v-model="bookStore.book.stok">
                            </div>
                            <div class="my-4">
                                <span>Pilih Category</span> <br>
                                <select class="select select-bordered w-full" required
                                    v-model="bookStore.book.category_id">

                                    <option v-for="category in arrayCategory" :value="category.id">{{ category.name }}
                                    </option>

                                </select>
                            </div>


                            <span>Unggah Image Book</span><br>
                            <input type="file" class="file-input file-input-bordered w-full" @change="handleUpload" />

                            <div class="mt-6">
                                <button type="submit"
                                    class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                                    Edit Book </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script setup>
import { useBookStore } from '@/stores/bookStore';
import { ref, reactive, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore()
const route = useRoute()
const bookStore = useBookStore()
const book_id = ref('')
const { showBook, deleteBook, updateBook } = bookStore
book_id.value = route.params.id
// console.log(book_id.value);
// showBook(book_id.value)

const loading = ref(true)
onMounted(async () => {
    await showBook(book_id.value);
    loading.value = false;
})


const isAdmin = ref(false)
// console.log(authStore.tokenUser);
watch(() => authStore.userData, (newValue) => {
    isAdmin.value = newValue && newValue.roles.name === 'owner';
}, { immediate: true });

import { useToast } from 'vue-toastification';
const toast = useToast();

const handleDelete = async () => {
    await deleteBook(route.params.id)
    toast.success("Buku dihapus", {
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
}


import { useCategoryStore } from '@/stores/categoryStore';
const categoryStore = useCategoryStore()
const { arrayCategory, indexCategory } = categoryStore
indexCategory()

const bookToUpdate = reactive({
    image: null
})

const handleUpload = (e) => {
    const selectImage = e.target.files[0];
    bookToUpdate.image = selectImage
}

const handleSubmit = async () => {
    try {
        let formData = new FormData

        formData.append('title', bookStore.book.title)
        formData.append('summary', bookStore.book.summary)
        formData.append('stok', bookStore.book.stok)
        formData.append('category_id', bookStore.book.category_id)
        formData.append('image', bookToUpdate.image)
        // console.log(book);
        await updateBook(formData, route.params.id)
        toast.success("Buku diupdate", {
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


import { useBorrowStore } from '@/stores/borrowStore';
const borrowStore = useBorrowStore()
const { createOrUpdateBorrow } = borrowStore
const inputData = reactive({
    load_date: null,
    barrow_date: null,
    book_id: null
})
const handleSubmitPinjam = async () => {
    try {
        let formData = new FormData
        formData.append('load_date', inputData.load_date)
        formData.append('barrow_date', inputData.barrow_date)
        formData.append('book_id', bookStore.book.id)
        await createOrUpdateBorrow(formData)
        
        toast.success("Buku Dipinjam", {
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
    createOrUpdateBorrow
}
</script>