<template>
  <div v-if="product" class="mt-30">
    <div>{{ product.title }}</div>
  </div>
</template>

<script>
import api from "../api";

export default {
  data() {
    return {
      product: null,
      loading: false,
    };
  },

  async mounted() {
    await this.getProduct();
  },
  computed: {
    productDetails() {
      return this.product;
    },
  },

  methods: {
    async getProduct() {
      const id = this.$route.params.id;
      console.log("Priduct Id", id);

      this.loading = true;

      try {
        const response = await api.get(`/products/${id}`);

        this.product = response.data.data;

        console.log("Product:", this.product.title);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
