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
          v-model="signin.username"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="username"
          type="text"
          placeholder="Username"
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
          v-model="signin.password"
          class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password"
          type="password"
          placeholder="******************"
        />
      </div>
      <div class="flex flex-col">
        <button
          @click.prevent="handleLogin"
          class="bg-green-600 hover:bg-blue-900 text-white font-bold py-2 px-4 mb-4 rounded w-full"
          type="button"
        >
          Login
        </button>
        <div
          @click="register"
          class="inline-block font-bold text-sm text-right text-blue-400 hover:text-blue-900 cursor-pointer"
        >
          i don't have an account
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Signin",
  data() {
    return {
      signin: {
        username: "",
        password: ""
      },
      token: "",
      isLoading: false
    };
  },
  components: {},
  methods: {
    ...mapActions(["login"]),
    handleLogin() {
      this.login(this.signin)
        .then(res => {
          this.$router.replace({
            name: "Project",
            params: { id: res.data.data._id }
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
            title: "Signed in successfully"
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
            title: "Incorrect username or password"
          });
        });
    },
    register() {
      this.$router.replace({
        name: "Signup"
      });
    }
  }
};
</script>
