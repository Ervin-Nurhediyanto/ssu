<template>
  <div
    v-if="criteria.score > 0"
    @click="toggleModal = !toggleModal"
    class="m-2 cursor-pointer"
  >
    {{ criteria.score }}
  </div>
  <icon
    v-else
    :icon="['fas', 'pen']"
    class="m-2 cursor-pointer"
    @click="toggleModal = !toggleModal"
  />
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
              class="flex flex-row w-full h-full text-center"
            >
              <div
                v-if="selected === index"
                class="border-2 border-black w-full p-1 bg-gray-300 cursor-pointer"
                @click.prevent="setScore(level.score, index)"
              >
                {{ level.description }}
              </div>
              <div
                v-else
                class="border-2 border-black w-full p-1 hover:bg-gray-200 cursor-pointer"
                @click.prevent="setScore(level.score, index)"
              >
                {{ level.description }}
              </div>
            </div>
            <div class="flex justify-end mt-4">
              <div
                @click.prevent="input"
                class="bg-gray-100 ml-4 p-1 px-4 border-2 border-black rounded-lg cursor-pointer w-1/4 text-center"
              >
                Add
              </div>
            </div>
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
  name: "Input-Share-Value",
  props: ["criteria", "creator", "group", "periodeFrom", "periodeTo", "id"],
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
  mounted() {},
  methods: {
    ...mapActions(["updateLink", "getLinks"]),
    setScore(input, index) {
      this.score = input;
      this.selected = index;
    },
    input() {
      const payload = {
        id: this.id,
        data: {
          nameCreator: this.creator,
          group: this.group,
          name: this.criteria.name,
          score: Number(this.score),
          periodeFrom: this.periodeFrom,
          periodeTo: this.periodeTo
        }
      };
      if (payload.data.score > 0) {
        this.updateLink(payload).then(() => {
          const payload = {
            link: this.$route.params.id
          };
          this.getLinks(payload);
        });
      } else {
        alert("please select the criteria factor");
      }
      this.toggleModal = false;
    }
  }
};
</script>
