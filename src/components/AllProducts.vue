<template>
  <div>
    <div class="text-display-medium font-weight-semibold mb-4">
      All Products
    </div>

    <v-row>
      <v-col
        v-for="product in products"
        :key="product.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <v-card class="product-card" @click="viewProduct(product)">
          <v-img
            v-if="product.descriptions.images.length"
            :src="product.descriptions.images[0]"
            height="250"
            cover
          />

          <v-card-title>
            {{ product.title }}
          </v-card-title>

          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <span v-if="product.descriptions.prices.length">
                <strong>TK.{{ product.descriptions.prices[0].price }}</strong>
              </span>

              <v-btn
                color="primary"
                size="small"
                @click.stop="addToCart(product)"
              >
                Add to Cart
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <div v-if="products.length === 0" class="text-center mt-4">
      No products found.
    </div>
  </div>
</template>
<script>
import api from "../api";
import Swal from "sweetalert2";
export default {
  components: {},
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    viewProduct(product) {
      this.$router.push(`/products/${product.id}`);
      console.log("View product", product);
    },
    addToCart(product) {
      console.log("Add to Cart", product);
    },
  },
  watch: {},
};
</script>
