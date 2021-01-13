<template>
  <div class="p-5">
    <div class="text-lg font-bold">EMPLOYEE FEE</div>
    <div class="flex flex-col bg-white border-2 border-black h-full w-full p-2">
      <div class="flex flex-row my-2">
        <label for="name" class="my-auto w-40">Employee Name</label>
        <input
          readonly
          type="text"
          class="border-2 border-black rounded-md my-auto ml-2 px-2 w-40"
          :value="linkValue.nameEmployee"
        />
      </div>

      <div class="flex flex-row my-2">
        <label for="periode" class="my-auto w-40">Salary Period</label>
        <div class="sm:flex sm:flex-col md:flex md:flex-row ">
          <Date
            :periode="periodeFrom"
            v-on:periode="handlePeriodeFrom($event)"
          />
          ~
          <Date :periode="periodeTo" v-on:periode="handlePeriodeTo($event)" />
        </div>
      </div>

      <div class="flex flex-row my-2">
        <label for="creator" class="my-auto w-40">Form Creator</label>
        <input
          v-model="creator"
          type="text"
          class="border-2 border-black rounded-md my-auto ml-2 px-2 w-40"
          placeholder="Name"
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
      v-for="(group, index) in linkValue.jobValue"
      :key="index"
      class="bg-gray-300 w-full"
    >
      <tr>
        <th class="w-1/5 p-2">No</th>
        <th class="w-3/5 p-2">{{ group.group }}</th>
        <th class="w-1/5 py-2 pr-16 text-right">{{ group.score }}</th>
      </tr>
      <tr
        v-for="(criteria, index) in group.factors"
        :key="index"
        class="bg-white w-full"
      >
        <td class="w-1/5 p-2 text-center bg-gray-200">{{ index + 1 }}</td>
        <td class="w-3/5 p-2">{{ criteria.name }}</td>
        <td class="w-1/5 py-2 pr-16 text-right">
          <Input
            :criteria="criteria"
            :creator="creator"
            :group="group.group"
            :periodeFrom="periodeFrom"
            :periodeTo="periodeTo"
            :id="linkValue._id"
          />
        </td>
      </tr>
    </table>

    <div class="flex justify-between mt-4">
      <div class="mt-16">
        <button
          class="border-2 border-black w-20 rounded-md mr-4"
          @click.prevent="handleCancle"
        >
          Cancel
        </button>
        <button
          class="border-2 border-black w-20 rounded-md"
          @click.prevent="save"
        >
          Save
        </button>
      </div>
      <div class="flex flex-col">
        <div
          class="bg-gray-300 rounded-md w-36 py-2 pr-16 text-right font-bold mb-2"
        >
          {{ linkValue.total }}
        </div>
        <div
          v-if="linkValue.salaryAccess === true"
          class="bg-white rounded-md w-36 py-2 text-center font-bold border-2 border-black"
        >
          Rp.{{ linkValue.salary }}
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
import Input from "../../../components/employee-share/input";
import Date from "../../../components/datepicker/datepicker";

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
    Input,
    Date
  },
  mounted() {
    const payload = {
      link: this.$route.params.id
    };
    this.getLinks(payload);
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      projectId: "projectId",
      valueId: "valueId",
      linkValue: "linkValue",

      value: "value",
      jobValues: "jobValues"
    })
  },
  methods: {
    ...mapActions([
      "getLinks",
      "updateLink",
      "detailValue",
      "deleteValue",
      "updateValue",
      "cancel"
    ]),
    save() {
      let nulls = 0;
      this.linkValue.jobValue.map(group => {
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
        this.$swal.fire(
          "Failed to save employee fee",
          "data cannot be empty",
          "error"
        );
      } else {
        const payload = {
          id: this.linkValue._id,
          data: {
            status: "completed",
            nameCreator: this.creator,
            periodeFrom: this.periodeFrom,
            periodeTo: this.periodeTo
          }
        };
        this.updateLink(payload).then(() => {
          this.periodeFrom = "";
          this.periodeTo = "";
          this.creator = "";

          this.$swal.fire("Save employee fee", "successfully", "success");

          this.$router.replace({
            name: "Employee-Share-Detail",
            params: { id: this.linkValue.shareLink }
          });
        });
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
