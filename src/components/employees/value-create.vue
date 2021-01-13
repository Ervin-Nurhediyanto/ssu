<template>
  <icon :icon="['fas', 'plus']" class="mx-1 cursor-pointer" @click="create" />
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
export default {
  name: "Create-Value",
  props: ["id"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      valueId: "valueId"
    })
  },
  mounted() {},
  methods: {
    ...mapActions(["insertValue", "getSubTitle"]),
    create() {
      const data = {
        idEmployee: this.id,
        salaryAccess: "true"
      };
      if (this.valueId) {
        this.$router.replace({
          name: "Employee-Value",
          params: { id: this.valueId }
        });
      } else {
        this.insertValue(data).then(res => {
          this.$router.replace({
            name: "Employee-Value",
            params: { id: res.data.created._id }
          });
        });
      }
      this.getSubTitle("Employee Value");
    }
  }
};
</script>
