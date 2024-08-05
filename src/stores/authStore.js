import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import customInstance from "@/api";
export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const response = ref("");
  const tokenUser = ref(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );

  const userData = ref(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const errMsg = ref("");
  const isError = ref(false);

  const loginUser = async (inputData) => {
    try {
      const { email, password } = inputData;
      const { data } = await customInstance.post("auth/login", {
        email: email,
        password: password,
      });
      const { token, user } = data;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));

      tokenUser.value = token;
      userData.value = user;

      isError.value = false;
      errMsg.value = "";
      router.push("/");
    } catch (error) {
      console.log(error);
      isError.value = true;
      errMsg.value = "Email atau Password Salah";
    }
  };

  const registerUser = async (inputData) => {
    try {
      const { name, email, password, password_confirmation } = inputData;
      const { data } = await customInstance.post("auth/register", {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      });
      const { token, user } = data;

      isError.value = false;
      errMsg.value = "";

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const logoutUser = async () => {
    try {
      // console.log(tokenUser.value);
      const { data } = await customInstance.post("auth/logout", null, {
        headers: { Authorization: `Bearer ${tokenUser.value}` },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      tokenUser.value = null;
      userData.value = null;

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await customInstance.get("me", {
        headers: { Authorization: `Bearer ${tokenUser.value}` },
      });
      const { user } = data;
      localStorage.setItem("user", JSON.stringify(user));
      userData.value = user;
    } catch (error) {
      console.log(error);
    }
    
  };

  const createOrUpdateProfile = async (inputData) => {
    try {
      const response = await customInstance.post("profile", inputData, {
        headers: { Authorization: `Bearer ${tokenUser.value}` },
      });
      // console.log(response);
      alert("sukses")
    } catch (error) {
      console.log(error);
    }
  };

  return {
    tokenUser,
    userData,
    loginUser,
    isError,
    errMsg,
    registerUser,
    logoutUser,
    getUser,
    response,
    createOrUpdateProfile,
  };
});
