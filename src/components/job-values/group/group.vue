<template>
  <div
    class="flex flex-row justify-between border-2 border-gray-300 rounded-md p-1 px-2 w-24 mr-6 cursor-pointer"
    @click="toggleModal = !toggleModal"
  >
    <icon :icon="['fas', 'pen']" class="my-auto border-2 border-transparent" />
    <span class="my-auto">Group</span>
  </div>
  <div
    v-if="toggleModal"
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center item-center z-50"
  >
    <div class="relative m-auto w-full max-w-2xl">
      <div class="bg-white w-full rounded shadow-2xl flex flex-col ">
        <div class="bg-black flex flex-row">
          <h4 class="p-4 m-1 w-1/24 mr-auto ml-2 font-bold text-white">
            GROUP
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
            <th class="border-2 border-gray-400 p-2">Name</th>
            <th class="border-2 border-gray-400" colspan="2">Actions</th>
          </tr>
          <tr
            v-for="(group, index) in jobValues.jobValue"
            :key="index"
            class="text-center"
          >
            <td class="border-2 border-gray-400 p-2">{{ group.group }}</td>
            <td class="border-2 border-gray-400 p-2 w-20">
              <Edit :oldGroup="group.group" :groups="groups" />
            </td>
            <td class="border-2 border-gray-400 p-2 w-20">
              <Delete :group="group.group" />
            </td>
          </tr>
        </table>

        <!-- Add Group -->
        <div class="flex justify-between p-4">
          <label class="p-1 font-bold" for="name">Name</label>
          <input
            class="border-2 border-black w-full ml-10 p-1"
            type="text"
            v-model="group"
            placeholder="job process"
            @keyup.enter="insert"
          />
        </div>
        <div class="flex justify-end">
          <div
            @click.prevent="insert"
            class="border-2 border-black bg-gray-200 w-24 rounded-md text-center my-4 cursor-pointer"
          >
            Add
          </div>
          <div
            class="border-2 border-black bg-gray-200 w-24 rounded-md text-center my-4 mr-4 ml-2 cursor-pointer"
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
  name: "Group",
  data() {
    return {
      toggleModal: false,
      group: ""
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
    ...mapActions(["getJobValues", "insertGroup"]),
    insert() {
      const data = {
        idProject: this.$route.params.id,
        group: this.group
      };
      if (this.jobValues.createdBy === this.userId) {
        this.insertGroup(data)
          .then(() => {
            this.getJobValues(this.$route.params.id);
          })
          .catch(err => {
            this.$swal.fire(
              "Failed to add group",
              data.group + " " + err.response.data.message,
              "error"
            );
          });
      } else {
        this.$swal.fire("Failed to add group", "Access denied", "warning");
      }

      this.group = "";
    }
  }
};
</script>
