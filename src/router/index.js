import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "../views/layout/AuthLayout.vue";
import MainLayout from "../views/layout/MainLayout.vue";
import Project from "../views/project/project.vue";

import store from "../store/index";

const routes = [
  {
    path: "/auth",
    name: "Auth",
    component: AuthLayout,
    children: [
      {
        path: "signin",
        name: "Signin",
        component: () => import("../views/auth/Signin.vue"),
        meta: { requiresVisitor: true }
      },
      {
        path: "signup",
        name: "Signup",
        component: () => import("../views/auth/Signup.vue"),
        meta: { requiresVisitor: true }
      },
      {
        path: "forgot-password",
        name: "Forgot-Password",
        component: () => import("../views/auth/ForgotPassword.vue"),
        meta: { requiresVisitor: true }
      },
      {
        path: "reset-password",
        name: "Reset-Password",
        component: () => import("../views/auth/ResetPassword.vue"),
        meta: { requiresVisitor: true }
      }
    ]
  },
  {
    path: "/project/:id",
    name: "Project",
    component: Project,
    meta: { requiresAuth: true }
  },
  {
    path: "/",
    name: "Main",
    component: MainLayout,
    redirect: {
      name: "Project",
      params: { id: store.getters.userId }
    },
    children: [
      {
        path: "employee/:id",
        name: "Employee",
        component: () => import("../views/main/employee/employee.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "employee-value/:id",
        name: "Employee-Value",
        component: () =>
          import("../views/main/employee-value/employee-value.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "employee-value-detail/:id",
        name: "Employee-Value-Detail",
        component: () =>
          import("../views/main/employee-value/employee-value-detail.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "employee-history/:id",
        name: "Employee-History",
        component: () =>
          import("../views/main/employee-history/employee-history.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "location/:id",
        name: "Location",
        component: () => import("../views/main/location/location.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "value/:id",
        name: "Job Value",
        component: () => import("../views/main/job-value/job-value.vue"),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: "/employee-share/:id",
    name: "Employee-Share",
    component: () => import("../views/main/employee-share/employee-share.vue")
  },
  {
    path: "/employee-share-detail/:id",
    name: "Employee-Share-Detail",
    component: () =>
      import("../views/main/employee-share/employee-share-detail.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({
        path: "/auth/signin"
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isLogin) {
      next({
        name: "Project",
        params: { id: store.getters.userId }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
