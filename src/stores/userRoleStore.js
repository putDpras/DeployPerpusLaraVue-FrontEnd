import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import customInstance from "@/api";
import { useAuthStore } from "./authStore";
export const useUserRoleStore = defineStore("userRole", () => {
  const router = useRouter();
  const authStore = useAuthStore();
  const arrayUserRole = ref(
    localStorage.getItem("arrayUserRole")
      ? JSON.parse(localStorage.getItem("arrayUserRole"))
      : null
  );
  const userRole = ref(
    localStorage.getItem("userRole")
      ? JSON.parse(localStorage.getItem("userRole"))
      : null
  );

  const indexUserRole = async () => {
    try {
      const { data } = await customInstance.get("role", {
        headers: { Authorization: `Bearer ${authStore.tokenUser}` },
      });
      localStorage.setItem("arrayUserRole", JSON.stringify(data.data));
      arrayUserRole.value = data.data;
    } catch (error) {
      console.log(error);
    }
  };
  const storeUserRole = async (inputData) => {
    try {
      // const {name} = inputData
      const respone = await customInstance.post("role", inputData, {
        headers: { Authorization: `Bearer ${authStore.tokenUser}` },
      });
      // alert("Barhasil Menambah Data");
      setTimeout(function() {
        router.go(0);
        },1500)
      // console.log(inputData);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserRole = async (inputData, id) => {
    try {
      // console.log(inputData);
      const response = await customInstance.post(
        `role/${id}?_method=PUT`,
        inputData,
        {
          headers: { Authorization: `Bearer ${authStore.tokenUser}` },
        }
      );
      // alert("Barhasil Mengubah Data");
      setTimeout(function() {
        router.go(0);
        },1500)
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUserRole = async (id) => {
    try {
      const response = await customInstance.post(
        `role/${id}?_method=DELETE`,
        null,
        {
          headers: { Authorization: `Bearer ${authStore.tokenUser}` },
        }
      );
      // alert("Barhasil Menghapus Data");
      // yield to.sleep(.500);
      setTimeout(function() {
        router.go(0);
        },1500)
      
    } catch (error) {
      console.log(error);
    }
  };
  return {
    arrayUserRole, userRole, indexUserRole, deleteUserRole, updateUserRole, storeUserRole
  }
});
