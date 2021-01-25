<template>
  <div id="app" class="bg-gray-200 w-screen h-screen">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import io from "socket.io-client";

export default {
  name: "App",
  data() {
    return {
      socket: io(process.env.VUE_APP_API_DOMAIN),
      version: "v-1.04"
    };
  },
  mounted() {
    this.socket.on("update", update => {
      if (this.version !== update) {
        this.$swal({
          title: "<i>Update Now</i>",
          html:
            "<b>Point SSU</b> recommends that you update to the latest version",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false
        }).then(result => {
          if (result.value) {
            console.log("update version " + update);
            this.$router.go(0);
            this.version = update;
          }
        });
      } else {
        console.log("no updated");
      }
    });
  },
  methods: {
    ...mapActions(["interceptorsRequest"]),
    ...mapActions(["interceptorsResponse"])
  },
  created() {
    this.interceptorsRequest();
    this.interceptorsResponse();
  }
};
</script>
