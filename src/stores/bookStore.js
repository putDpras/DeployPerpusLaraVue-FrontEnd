import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import customInstance from "@/api";
import { useAuthStore } from "./authStore";

export const useBookStore = defineStore("book", () => {
  const router = useRouter();
  const arrayBook = ref(
    localStorage.getItem("arrayBook")
      ? JSON.parse(localStorage.getItem("arrayBook"))
      : null
  );
  const book = ref(
    localStorage.getItem("book")
      ? JSON.parse(localStorage.getItem("book"))
      : null
  );
  const loading = ref(false);
  const isError = ref(false);

  const indexBook = async () => {
    try {
      loading.value = true;
      const { data } = await customInstance.get("book");
      localStorage.setItem("arrayBook", JSON.stringify(data.data));
      arrayBook.value = data.data;
    } catch (error) {
      console.log(error);
    } finally{
      loading.value = false;
    }
  };
  const authStore = useAuthStore();
  const { tokenUser } = authStore;

  const storeBook = async (inputData) => {
    try {
      // console.log(authStore.tokenUser);
      // console.log(inputData);
      const response = await customInstance.post("book", inputData, {
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      indexBook()
      // alert("Barhasil Menambahkan Data");
      isError.value = false
      router.push("/book");
    } catch (error) {
      // console.log(error);
      // console.log(tokenUser.value);
      isError.value = true
    }
  };
  const showBook = async (id) => {
    try {
      // console.log(id);
      const { data } = await customInstance.get(`book/${id}`);
      localStorage.setItem("book", JSON.stringify(data.data));
      book.value = data.data;
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBook = async (inputData, id) => {
    try {
      const response = await customInstance.post(
        `book/${id}?_method=PUT`,
        inputData,
        {
          headers: { Authorization: `Bearer ${tokenUser}` },
        }
      );
      // alert("Barhasil Mengubah Data");
      isError.value = false
      router.push("/book");
    } catch (error) {
      console.log(error);
      isError.value = true
    }
  };

  const deleteBook = async (id) => {
    try {
      const response = await customInstance.post(
        `book/${id}?_method=DELETE`,
        null,
        {
          headers: { Authorization: `Bearer ${tokenUser}` },
        }
      );
      // alert("Barhasil Menghapus Data");
      isError.value = false
      router.push("/book");
    } catch (error) {
      console.log(error);
      isError.value = true
    }
  };
  return {
    arrayBook,
    indexBook,
    storeBook,
    showBook,
    book,
    updateBook,
    deleteBook,
    loading,
    isError
  };
});
