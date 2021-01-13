<template>
  <div class="mr-5">
    <div class="border-2 border-gray-200 bg-black flex flex-row">
      <Search />
    </div>
    <div class="my-3 w-full h-80 bg-white text-center">
      <Chart />
    </div>
    <div>
      <table class="border-2 border-b-0 border-gray-400 w-full bg-white">
        <tr class="border-2 border-gray-400 bg-gray-300">
          <th class="p-2 border-2 border-gray-400 w-20">No</th>
          <th class="p-2 border-2 border-gray-400">Nama</th>
          <th class="p-2 border-2 border-gray-400">Tanggal Periode</th>
          <th class="p-2 border-2 border-gray-400">Job Value</th>
          <th class="p-2 border-2 border-gray-400">Gaji</th>
          <th class="p-2 border-2 border-gray-400">Creator Name</th>
          <th class="p-2 border-2 border-gray-400">Date Created</th>
          <th class="p-2 border-2 border-gray-400 w-20">Action</th>
        </tr>
        <tr
          v-for="(value, index) in values"
          :key="index"
          class="hover:bg-gray-200 cursor-pointer"
        >
          <td
            class="text-center p-2 border-2 border-gray-400"
            @click.prevent="detail(value._id)"
          >
            {{ index + 1 }}
          </td>
          <td
            class="text-center p-2 border-2 border-gray-400"
            @click.prevent="detail(value._id)"
          >
            {{ value.nameEmployee }}
          </td>
          <td
            class="text-center p-2 border-2 border-gray-400"
            @click.prevent="detail(value._id)"
          >
            {{ value.periodeFrom }} - {{ value.periodeTo }}
          </td>
          <td
            class="text-center p-2 border-2 border-gray-400"
            @click.prevent="detail(value._id)"
          >
            {{ value.total }}
          </td>
          <td
            class="text-center p-2 border-2 border-gray-400"
            @click.prevent="detail(value._id)"
          >
            Rp.{{ value.salary }}
          </td>
          <td
            class="text-center p-2 border-2 border-gray-400"
            @click.prevent="detail(value._id)"
          >
            {{ value.nameCreator }}
          </td>
          <td
            class="text-center p-2 border-2 border-gray-400"
            @click.prevent="detail(value._id)"
          >
            {{ value.createdAt }}
          </td>
          <td class="text-center p-2 border-2 border-gray-400">
            <Delete :id="value._id" :creator="value.createdBy" />
          </td>
        </tr>
      </table>

      <!-- <Page /> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import Search from "../../../components/employee-histories/search";
import Delete from "../../../components/employee-histories/delete";
import Chart from "../../../components/chart/chart";
// import Page from "../../../components/employees/pagination";

export default {
  name: "Employee-Histories",
  data() {
    return {
      jobValues: [],
      periods: []
    };
  },
  components: {
    Search,
    Delete,
    Chart
    // Page
  },
  mounted() {
    const payload = {
      idEmployee: this.$route.params.id,
      status: "completed"
    };
    this.getValues(payload).then(() => {
      this.values.map(value => {
        this.jobValues.push(value.total);
        this.periods.push(value.periodeFrom);
      });
    });
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      projectId: "projectId",
      values: "values"
    })
  },
  methods: {
    ...mapActions(["getValues"]),
    detail(id) {
      this.$router.replace({
        name: "Employee-Value-Detail",
        params: { id: id }
      });
    }
  }
};
</script>
