<template>
    <div>

        <body class="bg-gray-100 min-h-screen flex items-center justify-center pt-16 pb-16">

            <div class="bg-white p-8 rounded shadow-md max-w-md w-full mx-auto ">
                <h2 class="text-2xl font-semibold mb-4">Tambah Buku</h2>

                <form action="/book" @submit.prevent="handleSubmit">
                    <div class="mt-4">
                        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="title" name="title" class="mt-1 p-2 w-full border rounded-md"
                            v-model="book.title">
                    </div>

                    <br>
                    <span>Summary</span>
                    <div class="mt-4 flex">
                        <textarea class="textarea textarea-bordered w-96 " placeholder="Summary" v-model="book.summary">
                        </textarea>
                    </div>

                    <div class="mt-4">
                        <label for="stok" class="block text-sm font-medium text-gray-700">Stok</label>
                        <input type="stok" id="stok" name="stok" class="mt-1 p-2 w-full border rounded-md"
                            v-model="book.stok">
                    </div>
                    <div class="my-4">
                        <span>Pilih Category</span> <br>
                        <select class="select select-bordered w-full" v-model="book.category_id" required>

                            <option v-for="category in arrayCategory" :value="category.id">{{ category.name }}</option>
                            <!-- <option>Greedo</option> -->
                        </select>
                    </div>


                    <span>Unggah Image Book</span><br>
                    <input type="file" class="file-input file-input-bordered w-full" @change="handleUpload" />

                    <div class="mt-6">
                        <button type="submit" class="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                            Tambah Book </button>
                    </div>
                </form>
            </div>

        </body>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useBookStore } from '@/stores/bookStore';
import { reactive } from 'vue';
const authStore = useAuthStore();
const bookStore = useBookStore();
const { storeBook, indexBook } = bookStore;
const book = reactive({
    title: '',
    summary: '',
    stok: '',
    category_id: '',
    image: null
})

const handleUpload = (e) => {
    const selectImage = e.target.files[0];
    book.image = selectImage
}

const handleSubmit = () => {
    try {
        let formData = new FormData

        formData.append('title', book.title)
        formData.append('summary', book.summary)
        formData.append('stok', book.stok)
        formData.append('category_id', book.category_id)
        formData.append('image', book.image)
        // console.log(book);
        storeBook(formData)
    } catch (error) {
        console.log(error);
    }

}

import { useCategoryStore } from '@/stores/categoryStore';
const categoryStore = useCategoryStore()
const { arrayCategory, indexCategory } = categoryStore
indexCategory()
</script>