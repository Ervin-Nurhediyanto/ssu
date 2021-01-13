<template>
  <div id="app" class="bg-gray-200 w-screen h-screen">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "App",
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
