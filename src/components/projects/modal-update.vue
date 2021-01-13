<template>
  <div
    class="bg-gray-100 px-3 border-2 border-black rounded-lg cursor-pointer"
    @click="toggleModal = !toggleModal"
  >
    Rename
  </div>
  <div
    v-if="toggleModal"
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center item-center z-50"
  >
    <div class="relative m-auto w-full max-w-2xl">
      <div class="bg-white w-full rounded shadow-2xl flex flex-col ">
        <div class="bg-black flex flex-row">
          <h4 class="p-4 m-1 w-1/24 mr-auto ml-2 font-bold text-white">
            Edit Project
          </h4>
          <button
            class="text-white p-4 m-1 w-1/24 ml-auto mr-2 font-bold"
            @click="toggleModal = false"
          >
            X
          </button>
        </div>
        <div class="p-4">
          <div class="flex flex-row m-4">
            <label for="name" class="mr-4 my-auto">Name</label>
            <input
              v-model="name"
              type="text"
              class="border-2 border-black w-full rounded-sm p-1"
              :placeholder="project.name"
            />
            <div
              v-if="name"
              @click="update"
              class="bg-gray-100 ml-4 p-1 px-4 border-2 border-black rounded-lg cursor-pointer"
            >
              Save
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
  name: "Update-Project",
  props: ["id", "project"],
  data() {
    return {
      toggleModal: false,
      name: ""
    };
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      projects: "projects",
      projectLinks: "projectLinks"
    })
  },
  methods: {
    ...mapActions(["updateProject", "getProject"]),
    update() {
      const payload = {
        id: this.id,
        data: {
          name: this.name
        }
      };
      const project = {
        userId: this.$route.params.id,
        page: this.projectLinks.currentPage
      };
      if (this.project.createdBy === this.userId) {
        this.updateProject(payload)
          .then(() => {
            this.getProject(project);
            this.$swal.fire("Update project", "successfully", "success");
          })
          .catch(err => {
            this.$swal.fire(
              "Failed to update project",
              payload.data.name + " " + err.response.data.message,
              "error"
            );
          });
      } else {
        this.$swal.fire("Failed to update project", "Access denied", "warning");
      }

      this.toggleModal = false;
      this.name = "";
    }
  }
};
</script>
