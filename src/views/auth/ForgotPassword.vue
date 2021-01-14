<template>
  <div class="mx-2 my-2">
    <div class="mb-4">Forgot Password</div>
    <form action="">
      <div class="mb-4">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="email"
        >
          Email
        </label>
        <input
          v-model="email"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
          id="email"
          type="text"
          placeholder="email"
        />
      </div>
      <div class="flex flex-col">
        <button
          @click.prevent="sendEmail"
          class="bg-green-600 hover:bg-blue-900 text-white font-bold py-2 px-4 mb-4 rounded w-full"
          type="button"
        >
          Send Email
        </button>
        <div
          @click="login"
          class="inline-block font-bold text-sm text-right text-blue-400 hover:text-blue-900 cursor-pointer"
        >
          Back
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Forgot Password",
  data() {
    return {
      email: ""
    };
  },
  components: {},
  methods: {
    ...mapActions(["forgotPassword"]),
    sendEmail() {
      const payload = {
        email: this.email
      };
      this.forgotPassword(payload)
        .then(res => {
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
            title: res.data.message
          });
        })
        .catch(err => {
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
            title: err.response.data.error.message
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
