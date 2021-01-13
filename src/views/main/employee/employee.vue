<template>
  <div class="mr-5">
    <div class="border-2 border-gray-200 bg-black flex flex-row">
      <Add :id="projectId" :locations="locations" :employees="employees" />
      <Search :id="projectId" />
    </div>
    <div class="my-3">
      <Sync />
    </div>
    <div class="overflow-scroll">
      <table class="border-2 border-b-0 border-gray-400 w-full bg-white">
        <tr class="border-2 border-gray-400 bg-gray-300">
          <th class="p-2 border-2 border-gray-400">Name</th>
          <th class="p-2 border-2 border-gray-400">Job Location</th>
          <th class="p-2 border-2 border-gray-400">Job Value</th>
          <th class="p-2 border-2 border-gray-400">Salary</th>
          <th class="p-2 border-2 border-gray-400" colspan="3">Actions</th>
        </tr>
        <tr v-for="(employee, index) in employees" :key="index">
          <td class="text-center p-2 border-2 border-gray-400">
            {{ employee.name }}
          </td>
          <td class="text-center p-2 border-2 border-gray-400">
            {{ employee.location }}
          </td>
          <td class="text-center p-2 border-2 border-gray-400">
            {{ employee.total }}
          </td>
          <td class="text-center p-2 border-2 border-gray-400">
            Rp. {{ salary(employee.salary) }}
          </td>
          <td class="text-center p-2 border-2 border-gray-400">
            <Create :id="employee._id" />
          </td>
          <td class="text-center p-2 border-2 border-gray-400">
            <Share :id="employee._id" />
          </td>
          <td class="text-center p-2 border-2 border-gray-400">
            <History :id="employee._id" />
          </td>
        </tr>
      </table>
    </div>
    <Page />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import Add from "../../../components/employees/modal-insert";
import Search from "../../../components/employees/search";
import Sync from "../../../components/employees/sync";
import Create from "../../../components/employees/value-create";
import Share from "../../../components/employees/value-share";
import History from "../../../components/employees/value-history";
import Page from "../../../components/employees/pagination";

export default {
  name: "Employee",
  data() {
    return {};
  },
  components: {
    Add,
    Search,
    Sync,
    Create,
    Share,
    History,
    Page
  },
  mounted() {
    if (this.valueId) {
      this.$router.replace({
        name: "Employee-Value",
        params: { id: this.valueId }
      });
    }

    const loc = {
      userId: this.userId
    };
    this.getLocations(loc);
    if (this.projectId) {
      const payload = {
        projectId: this.$route.params.id,
        page: 1
      };
      this.getEmployees(payload);
    } else {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      projectId: "projectId",
      valueId: "valueId",
      employees: "employees",
      employeeLinks: "employeeLinks",
      locations: "locations"
    })
  },
  methods: {
    ...mapActions(["getEmployees", "getLocations", "getLinks"]),
    salary(salary) {
      let rupiah = "";
      const salaryRp = salary.toString().split(".");
      const angkarev = salaryRp[0]
        .toString()
        .split("")
        .reverse()
        .join("");
      for (let i = 0; i < angkarev.length; i++) {
        if (i % 3 === 0) {
          rupiah += angkarev.substr(i, 3) + ".";
        }
      }
      if (salaryRp[1]) {
        rupiah =
          rupiah
            .split("", rupiah.length - 1)
            .reverse()
            .join("") +
          "." +
          salaryRp[1];
      } else {
        rupiah =
          rupiah
            .split("", rupiah.length - 1)
            .reverse()
            .join("") +
          "." +
          "00";
      }
      return rupiah;
    }
  }
};
</script>
<style scoped>
.overflow-scroll::-webkit-scrollbar {
  display: none;
}
</style>
