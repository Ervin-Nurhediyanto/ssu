<template>
  <icon
    :icon="['fas', 'trash']"
    class="mx-2 cursor-pointer"
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
            Delete Project
          </h4>
          <button
            class="text-white p-4 m-1 w-1/24 ml-auto mr-2 font-bold"
            @click="toggleModal = false"
          >
            X
          </button>
        </div>
        <div class="p-4">
          <div class="mb-5">
            <h2 class="text-2xl font-bold flex justify-center">
              Are you sure ?
            </h2>
            <h4 class="flex justify-center">
              Do you really want to delete
              <span class="font-bold underline mx-2"> {{ project.name }} </span>
              ? This process cannot be undone.
            </h4>
          </div>
          <div class="flex justify-center">
            <button
              @click="toggleModal = false"
              class="bg-gray-300 text-gray-900 rounded hover:bg-gray-200 px-6 py-2 focus:outline-none mx-1"
            >
              Cancel
            </button>
            <button
              @click="handleDelete"
              class="bg-red-500 text-gray-200 rounded hover:bg-red-400 px-6 py-2 focus:outline-none mx-1"
            >
              Delete
            </button>
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
  name: "Delete-Project",
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
      projectLinks: "projectLinks"
    })
  },
  methods: {
    ...mapActions(["deleteProject", "getProject"]),
    handleDelete() {
      const project = {
        userId: this.$route.params.id,
        page: this.projectLinks.currentPage
      };
      if (this.project.createdBy === this.userId) {
        this.deleteProject(this.id)
          .then(() => {
            this.getProject(project).then(res => {
              if (res.data.data.length === 0) {
                const preventPage = {
                  userId: this.userId,
                  page: project.page - 1
                };
                this.getProject(preventPage);
              }
            });
            this.$swal.fire("Delete project", "successfully", "success");
          })
          .catch(err => {
            this.$swal.fire(
              "Failed to delete project",
              "Project " + err.response.data.message,
              "error"
            );
          });
      } else {
        this.$swal.fire("Failed to delete project", "Access denied", "warning");
      }

      this.toggleModal = false;
    }
  }
};
</script>
