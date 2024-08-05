import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import EditProfileView from '@/views/auth/EditProfileView.vue'
import RoleView from '@/views/roles/RoleView.vue'
import CategoryView from '@/views/category/CategoryView.vue'
import BookView from '@/views/book/BookView.vue'
import TambahBookView from '@/views/book/TambahBookView.vue'
import ShowBookView from '@/views/book/ShowBookView.vue'
import CategoryShowView from '@/views/category/CategoryShowView.vue'
import BorrowListView from '@/views/borrow/BorrowListView.vue'
import { useAuthStore } from '@/stores/authStore'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {requiresAuth: true}
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {afterAuth: true}
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {afterAuth: true}
    },
    {
      path: '/editProfile',
      name: 'editProfile',
      component: EditProfileView,
      meta: {requiresAuth: true}
    },

    //Roles
    {
      path: '/role',
      name: 'role',
      component: RoleView,
      meta: { requiresOwner: true}
    },

    //Category
    {
      path: '/category',
      name: 'category',
      component: CategoryView
    },
    {
      path: '/category/:id',
      name: 'showCategory',
      component: CategoryShowView
    },

    //Book
    {
      path: '/book',
      name: 'book',
      component: BookView
    },
    {
      path: '/tambahBook',
      name: 'tambahBook',
      component: TambahBookView,
      meta: { requiresOwner: true}
    },
    {
      path: '/book/:id',
      name: 'showBook',
      component: ShowBookView
    },

    //Borrow
    {
      path: '/borrow',
      name: 'borrow',
      component: BorrowListView,
      meta: { requiresOwner: true}
    },
  ]
})

router.beforeEach(async (to, from) => {
  const authStore = await useAuthStore();
  if (to.meta.requiresAuth && !authStore.tokenUser) {
    window.alert("Anda Harus Login");
    return {
      path: "/",
    };
  }
  if (
    to.meta.requiresOwner &&
    authStore.userData.roles.name != "owner"
  ) {
    return {
      path: "/",
    };
  }
  if (to.meta.afterAuth && authStore.tokenUser) {
    return {
      path: "/",
    };
  }
});
export default router;