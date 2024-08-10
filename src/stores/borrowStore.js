import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import customInstance from "@/api";
import { useAuthStore } from "./authStore";

export const useBorrowStore = defineStore("borrow", () => {
  const router = useRouter();
  const authStore = useAuthStore();
  const { tokenUser } = authStore;
  const arrayBorrow = ref(
    localStorage.getItem("arrayBorrow")
      ? JSON.parse(localStorage.getItem("arrayBorrow"))
      : null
  );
  const borrow = ref(
    localStorage.getItem("borrow")
      ? JSON.parse(localStorage.getItem("borrow"))
      : null
  );

  const indexBorrow = async () => {
    try {
      const { data } = await customInstance.get("borrow", {
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      localStorage.setItem("arrayBorrow", JSON.stringify(data.data));
      arrayBorrow.value = data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const createOrUpdateBorrow = async (inputData) => {
    try {
      const { data } = await customInstance.post("borrow", inputData, {
        headers: { Authorization: `Bearer ${tokenUser}` },
      });
      router.push("/book");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    indexBorrow,
    arrayBorrow,
    borrow,
    createOrUpdateBorrow,
  };
});
