<template>
  <div
    v-if="criteria.score > 0"
    @click="toggleModal = !toggleModal"
    class="my-2 mx-auto cursor-pointer text-blue-400 hover:text-red-400"
  >
    ( Detail )
  </div>
  <div v-else class="my-2 mx-auto text-red-400">
    ( Null )
  </div>
  <div
    v-if="toggleModal"
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center item-center z-50"
  >
    <div class="relative m-auto w-full max-w-2xl">
      <div class="bg-white w-full rounded shadow-2xl flex flex-col ">
        <div class="bg-black flex flex-row">
          <h4 class="p-4 m-1 w-1/24 mr-auto ml-2 font-bold text-white">
            {{ criteria.name }}
          </h4>
          <button
            class="text-white p-4 m-1 w-1/24 ml-auto mr-2 font-bold"
            @click="toggleModal = false"
          >
            X
          </button>
        </div>
        <div class="p-4">
          <div class="flex flex-col m-4">
            <div
              v-for="(level, index) in criteria.level"
              :key="index"
              class="flex flex-row w-full h-full text-left"
            >
              <div
                v-if="criteria.score === level.score"
                class="border-2 border-black w-full p-1 bg-gray-300"
              >
                {{ level.description }}
                <span class="font-bold">( {{ level.score }} )</span>
              </div>
              <div v-else class="border-2 border-black w-full p-1">
                {{ level.description }} ( {{ level.score }} )
              </div>
            </div>
            <div class="flex justify-end mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    v-if="toggleModal"
    class="absolute z-40 inset-0 opacity-25 bg-black"
  ></div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "Input-Value",
  props: ["criteria", "creator", "group", "periode"],
  data() {
    return {
      toggleModal: false,
      score: "",
      selected: ""
    };
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      projectId: "projectId",
      jobValues: "jobValues"
    })
  },
  mounted() {
    this.getJobValues(this.projectId);
  },
  methods: {
    ...mapActions(["updateValue", "detailValue", "getJobValues"]),
    setScore(input, index) {
      this.score = input;
      this.selected = index;
    },
    input() {
      const payload = {
        id: this.$route.params.id,
        data: {
          nameCreator: this.creator,
          group: this.group,
          name: this.criteria.name,
          score: Number(this.score),
          periode: this.periode
        }
      };
      if (this.jobValues.createdBy === this.userId) {
        if (payload.data.score > 0) {
          this.updateValue(payload).then(() => {
            this.detailValue(this.$route.params.id);
          });
        } else {
          alert("please select the criteria factor");
        }
      } else {
        alert("Access denied");
      }
      this.toggleModal = false;
    }
  }
};
</script>
