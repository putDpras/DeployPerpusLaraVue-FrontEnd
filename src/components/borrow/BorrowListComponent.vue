<template>
    <div>
        <div class="text-center mt-24">
            <p class="text-3xl font-bold">LIST BORROW</p>
        </div>
        <div v-if="loading" class="flex justify-center items-center h-screen">
            <span class="loading loading-ring loading-lg"></span>
        </div>
        <!-- <div class="flex justify-center mt-4"> -->
            <div v-if="!loading" class="flex flex-col justify-center mt-4 xl:mx-32 md:mx-12">
                <div class="overflow-x-auto min-h-[460px]">
                    <div class="min-w-full inline-block align-middle">
                        <div class="overflow-hidden">
                            <table class="min-w-full">
                                <thead class="border-b border-gray-200">
                                    <tr>
                                        <th scope="col" class="py-1 group text-start font-normal focus:outline-none">
                                            <div
                                                class="py-1 px-2.5 inline-flex items-center border border-transparent text-sm text-black rounded-md hover:border-gray-200">
                                                #
                                            </div>
                                        </th>
                                        <th scope="col" class="py-1 group text-start font-normal focus:outline-none">
                                            <div
                                                class="py-1 px-2.5 inline-flex items-center border border-transparent text-sm text-black rounded-md hover:border-gray-200">
                                                Load Date
                                            </div>
                                        </th>
                                        <th scope="col" class="py-1 group text-start font-normal focus:outline-none">
                                            <div
                                                class="py-1 px-2.5 inline-flex items-center border border-transparent text-sm text-black rounded-md hover:border-gray-200">
                                                Barrow Date
                                            </div>
                                        </th>
                                        <th scope="col" class="py-1 group text-start font-normal focus:outline-none">
                                            <div
                                                class="py-1 px-2.5 inline-flex items-center border border-transparent text-sm text-black rounded-md hover:border-gray-200">
                                                Book
                                            </div>
                                        </th>
                                        <th scope="col" class="py-1 group text-start font-normal focus:outline-none">
                                            <div
                                                class="py-1 px-2.5 inline-flex items-center border border-transparent text-sm text-black rounded-md hover:border-gray-200">
                                                User
                                            </div>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody class="divide-y divide-gray-200 dark:divide-neutral-700"
                                    v-for="(borrow, index) in borrowStore.arrayBorrow">
                                    <tr>
                                        <td class="p-3 whitespace-nowrap text-sm font-medium text-gray-800">
                                            {{ index+1 }}
                                        </td>
                                        <td class="p-3 whitespace-nowrap text-sm font-medium text-gray-800">
                                            {{ borrow.load_date }}
                                        </td>
                                        <td class="p-3 whitespace-nowrap text-sm font-medium text-gray-800">
                                            {{ borrow.barrow_date }}
                                        </td>
                                        <td class="p-3 whitespace-nowrap text-sm font-medium text-gray-800">
                                            {{ borrow.book.title }}
                                        </td>
                                        <td class="p-3 whitespace-nowrap text-sm font-medium text-gray-800">
                                            {{ borrow.user.name }}
                                        </td>

                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        <!-- </div> -->
    </div>
</template>

<script setup>
import { useBorrowStore } from '@/stores/borrowStore';
import { useAuthStore } from '@/stores/authStore';
import { onMounted, onUpdated, ref } from 'vue';
const borrowStore = useBorrowStore()
const { indexBorrow, arrayBorrow } = borrowStore

const loading  = ref(true);
const authStore = useAuthStore();
const {getUser} = authStore;
onMounted(async () => {
    await indexBorrow();
    loading.value = false
})

onUpdated(async () => {
    await indexBorrow();
    loading.value = false
})

</script>