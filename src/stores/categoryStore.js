import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import customInstance from "@/api";
import { useAuthStore } from "./authStore";
export const useCategoryStore = defineStore("category", () => {
  const router = useRouter();
  const authStore = useAuthStore();
  const arrayCategory = ref(
    localStorage.getItem("arrayCategory")
      ? JSON.parse(localStorage.getItem("arrayCategory"))
      : null
  );
  const category = ref(
    localStorage.getItem("category")
      ? JSON.parse(localStorage.getItem("category"))
      : null
  );

  const indexCategory = async () => {
    try {
      const { data } = await customInstance.get("category");
      // console.log(data);

      localStorage.setItem("arrayCategory", JSON.stringify(data.data));
      arrayCategory.value = data.data;
      // console.log(arrayGenre);
    } catch (error) {
      console.log(error);
    }
  };

  const storeCategory = async (inputData) => {
    try {
      // const {name} = inputData
      const respone = await customInstance.post("/category", inputData, {
        headers: { Authorization: `Bearer ${authStore.tokenUser}` },
      });
      alert("Barhasil Menambah Data");
      router.go(0);
      // console.log(inputData);
    } catch (error) {
      console.log(error);
    }
  };

  const showCategory = async (id) => {
    try {
      const { data } = await customInstance.get(`category/${id}`);
      localStorage.setItem("category", JSON.stringify(data.data));
      category.value = data.data;
      // router.go(0);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async (inputData, id) => {
    try {
      const response = await customInstance.post(
        `category/${id}?_method=PUT`,
        inputData,
        {
          headers: { Authorization: `Bearer ${authStore.tokenUser}` },
        }
      );
      alert("Barhasil Mengubah Data");
      router.go(0);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const response = await customInstance.post(
        `category/${id}?_method=DELETE`,
        null,
        {
          headers: { Authorization: `Bearer ${authStore.tokenUser}` },
        }
      );
      alert("Barhasil Menghapus Data");
      router.go(0);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    arrayCategory,
    indexCategory,
    storeCategory,
    category,
    showCategory,
    updateCategory,
    deleteCategory,
  };
});
