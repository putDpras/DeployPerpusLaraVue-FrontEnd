<template>
    <div>
        <section>
            <span class="flex justify-center text-3xl my-4 font-bold mt-24">List Buku dengan Category {{ categoryStore.category.name }}</span>
        </section>
        <div class="grid md:grid-cols-3 xl:grid-cols-4 mt-4 mx-4 justify-center gap-8 ml-8 mb-8">
            <div class="card bg-base-100 w-64 shadow-xl" v-for="book in categoryStore.category.books">
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
import { useCategoryStore } from '@/stores/categoryStore';
import { useRoute } from 'vue-router';
const authStore = useAuthStore()
const categoryStore = useCategoryStore()
const route = useRoute()
const { showCategory } = categoryStore

showCategory(route.params.id)


</script>