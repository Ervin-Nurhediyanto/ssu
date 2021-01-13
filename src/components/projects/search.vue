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
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "Search-Project",
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
    ...mapActions(["getProject"]),
    handleSeacrh() {
      const paylaod = {
        userId: this.$route.params.id,
        name: this.search,
        page: 1
      };
      this.getProject(paylaod);
    }
  }
};
</script>
