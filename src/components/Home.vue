<template>
    <div class="mt-24">
        <section>
            <span class="flex justify-center text-3xl mt-4 font-bold">RANDOM RECOMMENDATION</span>
        </section>
        <div v-if="loading" class="flex justify-center items-center h-screen">
            <span class="loading loading-ring loading-lg"></span>
        </div>
        <div class="grid md:grid-cols-2 gap-8 items-start mt-12 mx-8 mb-8" v-if="book">
            <div class="flex justify-center">
                <img :src="book.image" alt="Book Cover" width="400" height="600" class="rounded-lg shadow-lg" />
            </div>
            <div class="grid gap-6">
                <div>
                    <h1 class="text-3xl font-bold">{{ book.title }}</h1>
                </div>
                <div class="prose max-w-none text-justify">
                    <p>{{ book.summary }}</p>
                </div>
                <div class="flex items-center gap-4">
                    <span class="badge badge-secondary">in stock</span>
                    <div class="text-muted-foreground">
                        <span class="font-medium">{{ book.stok }}</span> copies available
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/authStore';
import { useBookStore } from '@/stores/bookStore';
import { onMounted, ref } from 'vue';

const bookStore = useBookStore();
const authStore = useAuthStore();
const book = ref(null);
const loading = ref(true);
onMounted(async () => {
    await bookStore.indexBook();
    if (bookStore.arrayBook && bookStore.arrayBook.length > 0) {
        book.value = bookStore.arrayBook[Math.floor(Math.random() * bookStore.arrayBook.length)];
    }
    loading.value = false
});
</script>
