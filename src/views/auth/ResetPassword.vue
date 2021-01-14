<template>
  <div class="mx-2 my-2">
    <div class="mb-4">Reset Password</div>
    <form action="">
      <div class="mb-6">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="password"
        >
          Password
        </label>
        <input
          v-model="password"
          class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="password"
          type="password"
          placeholder="******************"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-grey-darker text-sm font-bold mb-2"
          for="conformPassword"
        >
          Confirm Password
        </label>
        <input
          v-model="confirmPassword"
          class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
          id="conformPassword"
          type="password"
          placeholder="******************"
        />
      </div>
      <div class="flex flex-col">
        <button
          @click.prevent="handleReset"
          class="bg-green-600 hover:bg-blue-900 text-white font-bold py-2 px-4 mb-4 rounded w-full"
          type="button"
        >
          Reset Password
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "Reset Password",
  data() {
    return {
      password: "",
      confirmPassword: ""
    };
  },
  computed: {
    ...mapGetters({
      email: "email",
      emailVerificationCode: "emailVerificationCode"
    })
  },
  methods: {
    ...mapActions(["resetPassword"]),
    handleReset() {
      const payload = {
        email: this.email,
        emailVerificationCode: this.emailVerificationCode,
        password: this.password
      };

      if (this.password !== this.confirmPassword) {
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
          title: "Password and Confirm Password Must Match"
        });
      } else {
        this.resetPassword(payload)
          .then(() => {
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
              title: "Reset password successfully"
            });

            this.$router.replace({
              name: "Signin"
            });
          })
          .catch(() => {
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
              title: "Reset password failed"
            });
          });
      }
    }
  }
};
</script>
