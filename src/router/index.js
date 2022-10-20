import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store/index"

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
  {
    name: "SignUpPage",
    path: "/sign-up",
    component: () => import("../view/SignUp/SignUp.vue")
  },
  {
    name: "LoginPage",
    path: "/login",
    component: () => import("../view/Login/Login.vue")
  }
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

router.beforeEach(async (to, from) => {
  let isAuthenticated = store.getters.getLogStatus
  if (isAuthenticated && to.name === 'LoginPage' || to.name==='SignUpPage') {
    return '/'
  }
})

export default router;
