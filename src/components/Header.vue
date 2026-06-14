<template>
  <v-app-bar :elevation="4">
    <template v-slot:prepend>
      <v-btn @click="clickedHome">
        <svg-icon type="mdi" :path="path"></svg-icon>
        <v-app-bar-title>{{ title }}</v-app-bar-title>
      </v-btn>

      <v-btn
        color="indigo"
        class="mr-5 ml-15"
        rounded="xs"
        size="large"
        variant="tonal"
      >
        All Products
      </v-btn>
    </template>

    <login-modal :divisions="divisions" @click="getLoginData"> </login-modal>
    <v-btn color="red" class="mr-5" rounded="xs" size="large" variant="tonal">
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
import api from "../api";
import LoginModal from "./LoginModal.vue";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiHomeCircle } from "@mdi/js";

export default {
  name: "my-component",
  components: {
    "login-modal": LoginModal,
    SvgIcon,
  },
  data() {
    return {
      title: "Teddy Shop",
      divisions: [],
      path: mdiHomeCircle,
    };
  },
  methods: {
    async getLoginData() {
      //Get Divisions using api call
      try {
        const response = await api.get("/divisions");

        this.divisions = response.data.data;

        console.log("Divisions", this.divisions);
      } catch (error) {
        console.error(error);
      }
      console.log("Get login data");
    },
    clickedHome() {
      this.$router.push("/");
    },
  },
};
</script>
