<template>
  <input
    v-model="search"
    type="text"
    class="border p-1 pl-2 w-full"
    @change="handleSeacrh"
    placeholder="Search"
  />
</template>

<script>
// import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "Search-Employee",
  // props: ["id"],
  data() {
    return {
      search: ""
    };
  },
  computed: {
    ...mapGetters({
      userId: "userId"
    })
  },
  methods: {
    // ...mapActions(["getEmployees"]),
    // handleSeacrh() {
    //   const paylaod = {
    //     userId: this.userId,
    //     projectId: this.$route.params.id,
    //     name: this.search,
    //     page: 1
    //   };
    //   this.getEmployees(paylaod);
    // }
  }
};
</script>
