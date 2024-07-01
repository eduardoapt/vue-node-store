import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Checkout from "../views/Checkout.vue";
import Success from "../views/Success.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/checkout/:offerCode",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/success",
    name: "Success",
    component: Success,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
