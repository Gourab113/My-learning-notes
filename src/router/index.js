import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import ProductDetails from "../views/ProductDetails.vue";
import AllProducts from "../views/AllProducts.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  { path: "/products", name: "all-products", component: AllProducts },
  {
    path: "/products/:id",
    name: "product-details",
    component: ProductDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
