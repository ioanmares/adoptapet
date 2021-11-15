import { createWebHistory, createRouter } from "vue-router";
import Login from "@/pages/login/Login";
import Home from "@/pages/home/Home";

import NotFound from "@/pages/not-found/NotFound";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    children: [],
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [],
  },
  {
    path: "/:pathMatch(.*)*", // Unrecognized path automatically matches 404
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = localStorage.getItem("is-authenticated") === "true";

  if (to.path !== "/login" && !isAuthenticated) {
    next({ name: "Login" });
  } else if (to.path === "/login" && isAuthenticated) {
    next({ name: "Home" });
  } else {
    next();
  }
});

export default router;
