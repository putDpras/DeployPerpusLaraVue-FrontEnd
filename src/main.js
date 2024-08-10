import "@/style.css";
import { createApp, markRaw } from "vue";
import { createPinia } from "pinia";
import Toast from "vue-toastification";

import App from "./App.vue";
import router from "./router/index";
import "vue-toastification/dist/index.css";


const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
  });


pinia.use(({ store }) => (store.router = markRaw(router)));
app.mount("#app");
