<template>
  <icon
    :icon="['fas', 'pen']"
    class="m-2 cursor-pointer hover:text-blue-400"
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
            Edit Group
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
            <div class="flex flex-row w-full mb-4">
              <label for="name" class="mr-4 my-auto w-40">Name</label>
              <input
                v-model="group"
                type="text"
                class="border-2 border-black w-full rounded-sm p-1"
                :placeholder="oldGroup"
                @keyup.enter="update"
              />
            </div>

            <div class="flex justify-end">
              <div
                v-if="group"
                @click="update"
                class="bg-gray-100 ml-4 p-1 px-4 border-2 border-black rounded-lg cursor-pointer w-1/4"
              >
                Save
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
  name: "Update-Group",
  props: ["oldGroup", "groups"],
  data() {
    return {
      toggleModal: false,
      group: ""
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
    if (this.projectId) {
      this.getJobValues(this.$route.params.id);
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    ...mapActions(["getJobValues", "updateGroup"]),
    update() {
      const payload = {
        id: this.$route.params.id,
        data: {
          group: this.group,
          oldGroup: this.oldGroup
        }
      };
      if (this.jobValues.createdBy === this.userId) {
        this.updateGroup(payload)
          .then(() => {
            this.getJobValues(this.$route.params.id);
          })
          .catch(err => {
            this.$swal.fire(
              "Failed to edit group",
              payload.data.group + " " + err.response.data.message,
              "error"
            );
          });
      } else {
        this.$swal.fire("Failed to edit group", "Access denied", "warning");
      }

      this.toggleModal = false;
      this.group = "";
    }
  }
};
</script>
