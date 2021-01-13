<template>
  <div class="mr-5">
    <div class="flex justify-center text-3xl mb-2">Job Value</div>
    <div class="flex justify-between mx-2">
      <div class="text-sm font-bold">FACTOR CRITERIA</div>
      <Group />
    </div>
    <div>
      <table
        v-for="(JobValue, index) in jobValues.jobValue"
        :key="index"
        class="border-2 border-b-0 border-gray-400 w-full bg-white mt-4"
      >
        <tr class="border-2 border-gray-400 bg-gray-300">
          <th class="p-2 border-2 border-gray-400 w-20">No.</th>
          <th class="p-2 border-2 border-gray-400">{{ JobValue.group }}</th>
          <th class="p-2 border-2 border-gray-400 w-40">
            <Factors :index="index" :group="JobValue.group" />
          </th>
        </tr>
        <tr v-for="(factor, index) in JobValue.factors" :key="index">
          <td class="text-center p-2 border-2 border-gray-400">
            {{ index + 1 }}
          </td>
          <td class="text-center p-2 border-2 border-gray-400">
            {{ factor.name }}
          </td>
          <td class="text-center p-2 border-2 border-gray-400">
            <Level :index="index" :factor="factor" :group="JobValue.group" />
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import Group from "../../../components/job-values/group/group";
import Factors from "../../../components/job-values/criteria/criteria";
import Level from "../../../components/job-values/level/level";

export default {
  name: "Job-Value",
  data() {
    return {
      search: ""
    };
  },
  components: {
    Group,
    Factors,
    Level
  },
  mounted() {
    if (this.projectId) {
      this.getJobValues(this.$route.params.id);
    } else {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters({
      jobValues: "jobValues",
      project: "project",
      projectId: "projectId"
    })
  },
  methods: {
    ...mapActions(["getJobValues", "getDetailProject"])
  }
};
</script>

<style></style>
