<template>
  <div class="mr-5">
    <div class="text-lg font-bold">DETAIL EMPLOYEE FEE</div>
    <div class="flex flex-col bg-white border-2 border-black h-full w-full p-2">
      <div class="flex flex-row my-2">
        <label for="name" class="my-auto w-40">Employee Name</label>
        <input
          readonly
          type="text"
          class="border-2 border-black rounded-md my-auto ml-2 px-2 w-40"
          :value="value.nameEmployee"
        />
      </div>

      <div class="flex flex-row my-2">
        <label for="periode" class="my-auto w-40">Salary Period</label>
        <div class="sm:flex sm:flex-col md:flex md:flex-row ">
          <div>
            <input
              readonly
              type="text"
              class="border-2 border-black rounded-md my-auto mx-2 px-2 w-40"
              :value="value.periodeFrom"
            />
          </div>
          <span class="ml-2 sm:text-transparent md:text-black">~</span>
          <div>
            <input
              readonly
              type="text"
              class="border-2 border-black rounded-md my-auto mx-2 px-2 w-40"
              :value="value.periodeTo"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-row my-2">
        <label for="creator" class="my-auto w-40">Form Creator</label>
        <input
          readonly
          type="text"
          class="border-2 border-black rounded-md my-auto ml-2 px-2 w-40"
          :value="value.nameCreator"
        />
      </div>
    </div>

    <table class="bg-white w-full mt-4">
      <tr>
        <th class="w-1/5 p-2">Criteria Factors</th>
        <th class="w-3/5 p-2"></th>
        <th class="w-1/5 py-2 pr-10 text-right">Job Value</th>
      </tr>
    </table>

    <table
      v-for="(group, index) in value.jobValue"
      :key="index"
      class="bg-gray-300 w-full"
    >
      <tr>
        <th class="w-1/5 p-2">No</th>
        <th class="w-3/5 p-2">{{ group.group }}</th>
        <th class="w-1/5 py-2 pr-16 text-right">{{ group.score }}</th>
      </tr>
      <tr
        v-for="(criteria, indexCriteria) in group.factors"
        :key="indexCriteria"
        class="bg-white w-full"
      >
        <td class="w-1/5 p-2 text-center bg-gray-200">
          {{ indexCriteria + 1 }}
        </td>
        <td class="w-3/5 p-2">{{ criteria.name }}</td>
        <td class="w-1/5 py-2 pr-16 text-right">
          <Input
            :criteria="criteria"
            :creator="creator"
            :group="group.group"
            :periode="periode"
          />
        </td>
      </tr>
    </table>

    <div class="flex justify-between mt-4">
      <div class="mt-16"></div>
      <div class="flex flex-col">
        <div
          class="bg-gray-300 rounded-md w-36 py-2 pr-16 text-right font-bold mb-2"
        >
          {{ value.total }}
        </div>
        <div
          v-if="value.salaryAccess === true"
          class="bg-white rounded-md w-36 py-2 text-center font-bold border-2 border-black"
        >
          Rp.{{ value.salary }}
        </div>
        <div
          v-else
          class="bg-white rounded-md w-36 py-2 text-center font-bold border-2 border-black"
        >
          Salary
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import Input from "../../../components/employee-values/detail-input";

export default {
  name: "Employee-Value",
  data() {
    return {
      periodeFrom: "Periode From",
      periodeTo: "Periode To",
      creator: ""
    };
  },
  components: {
    Input
  },
  mounted() {
    this.detailValue(this.$route.params.id);
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      projectId: "projectId",
      valueId: "valueId",
      value: "value",
      jobValues: "jobValues"
    })
  },
  methods: {
    ...mapActions(["detailValue", "deleteValue", "updateValue", "cancel"]),
    handleCancle() {
      this.cancel("valueId").then(() => {
        this.deleteValue(this.$route.params.id);
        this.$router.go(0);
      });
    },
    save() {
      let nulls = 0;
      this.value.jobValue.map(group => {
        if (group.score <= 0) {
          nulls += 1;
        }
        group.factors.map(factor => {
          if (factor.score <= 0) {
            nulls += 1;
          }
        });
      });

      if (nulls > 0 || !this.periodeFrom || !this.periodeTo || !this.creator) {
        alert("data cannot be empty");
      } else {
        const payload = {
          id: this.$route.params.id,
          data: {
            status: "completed",
            nameCreator: this.creator,
            periodeFrom: this.periodeFrom,
            periodeTo: this.periodeTo
          }
        };

        if (this.jobValues.createdBy === this.userId) {
          this.updateValue(payload).then(() => {
            this.cancel("valueId");
            this.$router.go(0);

            this.periodeFrom = "";
            this.periodeTo = "";
            this.creator = "";
            alert("succses");
          });
        } else {
          alert("Access denied");
        }
      }
    },
    handlePeriodeFrom(periode) {
      this.periodeFrom = periode;
      console.log("Periode from: " + this.periodeFrom);
    },
    handlePeriodeTo(periode) {
      this.periodeTo = periode;
      console.log("Periode to: " + this.periodeTo);
    }
  }
};
</script>
