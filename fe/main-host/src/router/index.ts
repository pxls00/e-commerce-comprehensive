import { createRouter, createWebHistory } from "vue-router";

import $infra from "../infrastructure/index";
import $service from "../service/index";

import MainLayout from "../layouts/main-layout.vue";
import AuthLayout from "../layouts/auth-layout.vue";

import type { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/auth",
      name: "auth",
      component: AuthLayout,
      redirect: { name: "auth-signin" },
      beforeEnter (to, from, next) {
        beforeAuthRoute(next);
      },
      children: [
        {
          path: "signin",
          name: "auth-signin",
          component: () => import("../views/auth/views/signin/auth-signin.vue"),
        },
        {
          path: "signup",
          name: "auth-signup",
          component: () => import("../views/auth/views/signup/auth-signup.vue"),
        },
      ],
    },
    {
      path: "/",
      name: "home",
      alias: "/main",
      component: MainLayout,
      redirect: {
        name: "main-home",
      },
      beforeEnter (to, from, next) {
        beforeEachRoute(to, from, next);
      },
      children: [
        {
          path: "home",
          name: "main-home",
          component: () => import("../views/main/views/home/main-home.vue"),
        },
        {
          path: "profile",
          name: "main-profile",
          component: () => import("../views/main/views/profile/main-profile.vue"),
        },
        {
          path: "profile/update",
          name: "main-profile-update",
          component: async () => await import("../views/main/views/profile/views/update/profile-update.vue"),
        },
        {
          path: "product",
          name: "main-product",
          redirect: {
            name: "home",
          },
        },
        {
          path: "product/:uuid",
          name: "main-product-detail",
          component: async () => await import("../views/main/views/product/views/product-detail/product-detail.vue"),
        },
        {
          path: "product/add",
          name: "product-add",
          component: async () => await import("../views/main/views/product/views/product-add/product-add.vue"),
        },
      ],
    },
  ],
});

async function beforeEachRoute (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  try {
    if (!localStorage.getItem("token")) {
      const authResponse = await $infra.auth.checkAuth();
  
      await $service.auth.setAuthData(authResponse);
    }

    next();
  } catch (error) {
    next("/auth");
  }
}

async function beforeAuthRoute (next: NavigationGuardNext) {
  try {
    await $infra.auth.logout();

    await $service.auth.resetAuthData();
  } catch (error) {
    console.log(error);
  } finally {
    next();
  }
}

export default router;
