<template>
  <icon
    :icon="['fas', 'history']"
    class="mx-1 cursor-pointer"
    @click="history"
  />
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Employee-Histories",
  props: ["id"],
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getEmployeeId"]),
    history() {
      this.getEmployeeId(this.id);
      this.$router.replace({
        name: "Employee-History",
        params: { id: this.id } // Employee ID
      });
    }
  }
};
</script>
