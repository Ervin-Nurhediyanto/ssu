<template>
  <input
    v-model="search"
    type="text"
    class="border p-1 pl-2 w-full"
    @input="handleSeacrh($event.srcElement.value)"
    placeholder="Search"
  />
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "Search-Location",
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
    ...mapActions(["getLocations"]),
    handleSeacrh(e) {
      console.log(e);

      const paylaod = {
        userId: this.$route.params.id,
        location: this.search.toUpperCase(),
        page: 1
      };
      this.getLocations(paylaod);
    }
  }
};
</script>
