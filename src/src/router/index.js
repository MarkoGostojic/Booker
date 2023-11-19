import { createRouter, createWebHistory } from "vue-router";
import { projectAuth } from "@/firebase/config";
import Home from "../views/Home.vue";
import Login from "../views/auth/Login.vue";
import Signup from "../views/auth/Signup.vue";
import CreateBookList from "../views/books/CreateBookList";
import BookListDetails from "../views/books/BookListDetails";

const requireAuth = (to, from, next) => {
  let user = projectAuth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: requireAuth,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/books/create",
    name: "CreateBookList",
    component: CreateBookList,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: "/books/:id",
    name: "BookListDetails",
    component: BookListDetails,
    beforeEnter: requireAuth,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
