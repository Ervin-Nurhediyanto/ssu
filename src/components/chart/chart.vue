<template>
  <button
    @click="updateChart"
    title="double click to update chart"
    class="border-2 border-blue-400 rounded-lg p-1 mt-2 bg-blue-200 hover:bg-green-300 hover:text-white"
  >
    Show Graphic!
  </button>
  <apexchart
    height="300"
    width="100%"
    type="area"
    :options="options"
    :series="series"
  ></apexchart>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "chart",
  data() {
    return {
      jobValues: [],
      periods: [],
      options: {
        chart: {
          id: "vuechart"
        },
        xaxis: {
          categories: []
        }
      },
      series: [
        {
          name: "Job Value",
          data: []
        }
      ]
    };
  },
  mounted() {},
  computed: {
    ...mapGetters({
      userId: "userId",
      projectId: "projectId",
      values: "values"
    })
  },
  methods: {
    ...mapActions(["getValues"]),
    updateChart() {
      const payload = {
        idEmployee: this.$route.params.id,
        status: "completed"
      };
      this.getValues(payload).then(() => {
        this.jobValues = [];
        this.periods = [];

        this.values.map(value => {
          this.jobValues.push(value.total);
          this.periods.push(value.periodeFrom);
        });
      });

      this.series = [
        {
          name: "Job Value",
          data: this.jobValues
        }
      ];
      this.options = {
        chart: {
          id: "vuechart"
        },
        xaxis: {
          categories: this.periods
        }
      };
    }
  }
};
</script>

<style></style>
