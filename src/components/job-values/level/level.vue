<template>
  <button
    class="border-2 border-black rounded-md w-24"
    @click="toggleModal = !toggleModal"
  >
    Level
  </button>
  <div
    v-if="toggleModal"
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center item-center z-50"
  >
    <div class="relative m-auto w-full max-w-2xl">
      <div class="bg-white w-full rounded shadow-2xl flex flex-col ">
        <div class="bg-black flex flex-row">
          <h4 class="p-4 m-1 w-1/24 mr-auto ml-2 font-bold text-white">
            FACTORS CRITERIA {{ factor.name }}
          </h4>
          <button
            class="text-white p-4 m-1 w-1/24 ml-auto mr-2 font-bold"
            @click="toggleModal = false"
          >
            X
          </button>
        </div>
        <table class="border-2 border-black m-4">
          <tr class="bg-gray-200 border-2 border-gray-400">
            <th class="border-2 border-gray-400 p-2">Level</th>
            <th class="border-2 border-gray-400 p-2">Description</th>
            <th class="border-2 border-gray-400 p-2">Score</th>
            <th class="border-2 border-gray-400" colspan="2">Actions</th>
          </tr>
          <tr
            v-for="(level, index) in factor.level"
            :key="index"
            class="text-center"
          >
            <td class="border-2 border-gray-400 p-2">{{ level.level }}</td>
            <td class="border-2 border-gray-400 p-2">
              {{ level.description }}
            </td>
            <td class="border-2 border-gray-400 p-2">{{ level.score }}</td>
            <td class="border-2 border-gray-400 p-2 w-20">
              <Edit
                :group="group"
                :name="factor.name"
                :oldLevel="level.level"
                :levels="level"
              />
            </td>
            <td class="border-2 border-gray-400 p-2 w-20">
              <Delete :group="group" :name="factor.name" :level="level.level" />
            </td>
          </tr>
        </table>

        <!-- Add Factor -->
        <div class="flex justify-between p-4">
          <label class="p-1 font-bold w-2/5" for="name">Level</label>
          <input
            class="border-2 border-black w-full ml-10 p-1"
            type="text"
            v-model="level"
            placeholder=""
            @keyup.enter="insert"
          />
        </div>
        <div class="flex justify-between p-4">
          <label class="p-1 font-bold w-2/5" for="name">Description</label>
          <input
            class="border-2 border-black w-full ml-10 p-1"
            type="text"
            v-model="description"
            placeholder=""
            @keyup.enter="insert"
          />
        </div>
        <div class="flex justify-between p-4">
          <label class="p-1 font-bold w-2/5" for="name">Score</label>
          <input
            class="border-2 border-black w-full ml-10 p-1"
            type="text"
            v-model="score"
            placeholder=""
            @keyup.enter="insert"
          />
        </div>
        <div class="flex justify-end">
          <div
            @click.prevent="insert"
            class="border-2 border-black bg-gray-200 w-24 rounded-md text-center my-4 cursor-pointer hover:bg-blue-300"
          >
            Add
          </div>
          <div
            class="border-2 border-black bg-gray-200 w-24 rounded-md text-center my-4 mr-4 ml-2 cursor-pointer hover:bg-red-300"
            @click="toggleModal = false"
          >
            Close
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
import Edit from "./modal-update";
import Delete from "./modal-delete";

export default {
  name: "Level",
  props: ["index", "factor", "group"],
  data() {
    return {
      toggleModal: false,
      level: "",
      description: "",
      score: ""
    };
  },
  components: {
    Edit,
    Delete
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      projectId: "projectId",
      jobValues: "jobValues",
      project: "project"
    })
  },
  mounted() {
    if (this.projectId) {
      this.getJobValues(this.$route.params.id);
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapActions(["getJobValues", "insertLevel"]),
    insert() {
      const data = {
        idProject: this.$route.params.id,
        group: this.group,
        name: this.factor.name,
        level: Number(this.level),
        description: this.description,
        score: Number(this.score)
      };
      if (this.jobValues.createdBy === this.userId) {
        if (data.score === 0) {
          this.$swal.fire(
            "Failed to add level",
            "score cannot be null",
            "error"
          );
        }
        if (data.level > 0 && data.score > 0) {
          this.insertLevel(data)
            .then(() => {
              this.getJobValues(this.$route.params.id);
            })
            .catch(err => {
              this.$swal.fire(
                "Failed to add level",
                "Level" + data.level + " " + err.response.data.message,
                "error"
              );
            });
        } else {
          this.$swal.fire(
            "Failed to add level",
            "Level and Score must be a number",
            "error"
          );
        }
      } else {
        this.$swal.fire("Failed to add level", "Access denied", "warning");
      }

      this.level = "";
      this.description = "";
      this.score = "";
    }
  }
};
</script>
