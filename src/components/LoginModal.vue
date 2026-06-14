<template>
  <div class="text-center pa-4">
    <v-btn
      color="light-blue"
      class="mr-5"
      rounded="xs"
      size="large"
      variant="tonal"
      @click="openModal"
    >
      Login
    </v-btn>

    <v-dialog v-model="dialog" max-width="450">
      <v-card>
        <v-form @submit.prevent="submitForm">
          <!-- Login -->
          <v-text-field
            v-model="emailOrMobile"
            required
            class="mx-2 mt-2"
            label="Email or Mobile No"
            v-if="isLogin"
          ></v-text-field>

          <!-- Signup -->

          <v-text-field
            v-model="name"
            required
            class="mx-2 mt-2"
            label="Name"
            v-if="!isLogin"
          ></v-text-field>

          <v-text-field
            v-model="email"
            required
            class="mx-2"
            label="Email"
            v-if="!isLogin"
          ></v-text-field>

          <v-text-field
            v-model="mobile"
            required
            class="mx-2"
            label="Mobile No"
            v-if="!isLogin"
          ></v-text-field>
          <v-select
            v-model="division"
            :items="divisions"
            label="Division"
            v-if="!isLogin"
            class="mx-2"
          ></v-select>
          <v-select
            v-model="district"
            :items="districts"
            label="District"
            v-if="!isLogin"
            class="mx-2"
          ></v-select>
          <v-textarea
            class="mx-2"
            v-model="address"
            rows="1"
            max-rows="3"
            auto-grow
            label="Address"
            v-if="!isLogin"
          ></v-textarea>
          <v-text-field
            v-model="password"
            label="Password"
            type="input"
            class="mx-2"
            required
          >
          </v-text-field>
          <v-text-field
            v-model="retypePassword"
            label="Retype Password"
            type="input"
            class="mx-2"
            v-if="!isLogin"
            required
          ></v-text-field>
          <div class="bg-amber-400 flex flex-row items-center">
            <div class="w-[100px]">
              <v-btn class="m-4" type="submit" block>{{
                loginButtonText
              }}</v-btn>
            </div>
            <div class="w-[150px] ml-3" v-if="isLogin">
              <v-btn variant="text" class="m-4" block @click="createAccount"
                >Or Create an account</v-btn
              >
            </div>

            <div class="w-[150px] ml-3" v-if="!isLogin">
              <v-btn variant="text" class="m-4" block @click="loginAccount"
                >Or Login</v-btn
              >
            </div>
          </div>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from "../api";
export default {
  props: {
    divisions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dialog: false,
      name: "",
      emailOrMobile: "",
      mobile: "",
      email: "",
      nameRules: [(v) => !!v || "Name is required"],
      isLogin: true,
      password: "",
      retypePassword: "",
      address: "",
      division: "",
      districts: [],
      district: "",
    };
  },
  computed: {
    loginButtonText() {
      return this.isLogin ? "Login" : "Signup";
    },
  },
  methods: {
    openModal() {
      this.dialog = true;
      console.log("Open Modal");
    },
    closeModal() {
      this.dialog = false;
    },
    async submitForm() {
      console.log("First name", this.name);
      console.log("Form submitted");
      this.dialog = false;

      if (this.isLogin) {
        console.log("Login called");
      } else {
        console.log("Signup called");
        const payload = {
          name: this.name,
          email: this.email,
          mobile_no: this.mobile,
          address: this.address,
          district: this.district,
          division: this.division,
          password: this.password,
        };
        try {
          const response = await api.post("/add-user", payload);
          console.log("Signup Success", response.data);
        } catch (error) {
          console.error(error);
        }
      }
    },
    createAccount() {
      console.log("Create new account");
      this.isLogin = false;
    },
    loginAccount() {
      this.isLogin = true;
    },
    async getDistricts(division) {
      console.log("Selected division", division);
      //Get Divisions using api call
      try {
        const response = await api.get("/districts-by-division", {
          params: {
            division: division,
          },
        });

        this.districts = response.data.data;

        console.log("Districts", this.districts);
      } catch (error) {
        console.error(error);
      }
      console.log("Get login data");
    },
  },
  watch: {
    async division(newVal) {
      if (newVal) {
        await this.getDistricts(newVal);
      }
    },
  },
};
</script>
