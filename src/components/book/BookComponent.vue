<template>
    <div>
        <div class="flex justify-end mr-16 mt-24" v-if="isAdmin">
            <router-link to="/tambahBook"><button class="btn btn-primary font-bold">+ | Tambah
                    Data</button></router-link>
        </div>
        <div v-else class="flex mt-28"></div>
        <div class="grid md:grid-cols-3 xl:grid-cols-4 mt-4 mx-4 justify-center gap-8">
            <div class="card bg-base-100 w-64 shadow-xl" v-for="book in arrayBook">
                <figure class="h-64">
                    <img :src="book.image" alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title text-justify">
                        {{ book.title }}
                        <div class="badge badge-secondary" v-if="book.stok < 10">Limited</div>
                    </h2>
                    <p class=" text-justify">{{ book.summary.slice(0, 50) }}...</p>
                    <div class="card-actions justify-end">
                        <div><router-link :to="{ name: 'showBook', params: { id: book.id } }"><button
                                    class="btn btn-primary">Detail</button></router-link></div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useBookStore } from '@/stores/bookStore';
import { onMounted, ref, watch } from 'vue';
const bookStore = useBookStore()
const authStore = useAuthStore()

const { indexBook, arrayBook } = bookStore;
indexBook()

const isAdmin = ref(false)
console.log(authStore.tokenUser);
watch(() => authStore.userData, (newValue) => {
    isAdmin.value = newValue && newValue.roles.name === 'owner';
}, { immediate: true });
</script>