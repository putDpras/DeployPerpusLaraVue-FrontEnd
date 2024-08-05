<template>
    <div class="mt-24">
        <section>
            <span class="flex justify-center text-3xl my-4 font-bold">RANDOM RECOMENDATION</span>
        </section>
        <div className="grid md:grid-cols-2 gap-8 items-start mt-12 mx-8 mb-8">
            <div className="flex justify-center">
                <img :src="book.image" alt="Book Cover" width={400} height={600} className="rounded-lg shadow-lg" />
            </div>
            <div className="grid gap-6">
                <div>
                    <h1 className="text-3xl font-bold ">{{ book.title }}</h1>
                </div>
                <div className="prose max-w-none text-justify">
                    <p>
                        {{ book.summary }}
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <span class="badge badge-secondary">
                        in stock
                    </span>
                    <div className="text-muted-foreground">
                        <span className="font-medium">{{ book.stok }}</span> copies available
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { useBookStore } from '@/stores/bookStore';
import { onMounted } from 'vue';
const bookStore = useBookStore();
const { arrayBook, indexBook } = bookStore;

indexBook()
const book = arrayBook[Math.floor(Math.random() * arrayBook.length)]

console.log(book);
</script>
