import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    name: "MainPage",
    path: "/",
    component: () => import("../view/Main/Main.vue"),
    children: [
      {
        name: "HomePage",
        path: "",
        component: () => import("../view/Home/Home.vue"),
      },
      {
        name: "BrowsePage",
        path: "browse",
        component: () => import("../view/Browse/Browse.vue"),
      },
      {
        name: "ProductPage",
        path: "p/:productID",
        component: () => import("../view/Product/Product.vue"),
      },
    ],
  },
];

const router = createRouter({
  routes,
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

export default router;
