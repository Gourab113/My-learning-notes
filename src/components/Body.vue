<template>
  <div class="mt-30">
    <all-products :products="allProducts" />
  </div>
</template>

<script>
import api from "../api";
import Swal from "sweetalert2";

import AllProducts from "./AllProducts.vue";

export default {
  components: {
    "all-products": AllProducts,
  },
  props: {},
  data() {
    return {
      allProducts: [],
    };
  },
  async mounted() {
    await this.getProducts();
  },
  computed: {},
  methods: {
    async getProducts() {
      try {
        const response = await api.get("/get-products");

        this.allProducts = response.data.data;

        console.log("Products:", this.allProducts);
      } catch (error) {
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to load products",
        });
      }
    },
  },
  watch: {},
};
</script>
