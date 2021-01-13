<template>
  <div class="mx-2 my-2">
    <form action="">
      <div class="mb-4">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="username"
        >
          Username
        </label>
        <input
          v-model="signup.username"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="username"
          type="text"
          placeholder="Username"
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="email"
        >
          email
        </label>
        <input
          v-model="signup.email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="email"
          type="text"
          placeholder="Email"
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="firstname"
        >
          first name
        </label>
        <input
          v-model="signup.fname"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="firstname"
          type="text"
          placeholder="First name"
        />
      </div>
      <div class="mb-4">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="lastname"
        >
          last name
        </label>
        <input
          v-model="signup.lname"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="lastname"
          type="text"
          placeholder="Last name"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          v-model="signup.password"
          class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password"
          type="password"
          placeholder="******************"
        />
      </div>
      <div class="flex flex-col">
        <button
          @click.prevent="handleRegister"
          class="bg-green-600 hover:bg-blue-900 text-white font-bold py-2 px-4 mb-4 rounded w-full"
          type="button"
        >
          Register
        </button>
        <div
          @click="login"
          class="inline-block font-bold text-sm text-right text-blue-400 hover:text-blue-900 cursor-pointer"
        >
          i have an account
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Signup",
  data() {
    return {
      signup: {
        email: "",
        username: "",
        password: "",
        fname: "",
        lname: ""
      },
      isLoading: false
    };
  },
  components: {},
  methods: {
    ...mapActions(["register"]),
    handleRegister() {
      this.register(this.signup)
        .then(() => {
          this.$router.replace({
            name: "Signin"
          });
          const Toast = this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: toast => {
              toast.addEventListener("mouseenter", this.$swal.stopTimer);
              toast.addEventListener("mouseleave", this.$swal.resumeTimer);
            }
          });
          Toast.fire({
            icon: "success",
            title: "Successfully registered"
          });
        })
        .catch(err => {
          console.log(err.response);
          const Toast = this.$swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: toast => {
              toast.addEventListener("mouseenter", this.$swal.stopTimer);
              toast.addEventListener("mouseleave", this.$swal.resumeTimer);
            }
          });
          Toast.fire({
            icon: "error",
            title: "Failed to register"
          });
        });
    },
    login() {
      this.$router.replace({
        name: "Signin"
      });
    }
  }
};
</script>
