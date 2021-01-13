<template>
  <icon
    :icon="['fas', 'plus']"
    class="m-2 border-2 border-transparent cursor-pointer"
    @click="toggleModal = !toggleModal"
  />
  <div
    v-if="toggleModal"
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center item-center z-50"
  >
    <div class="relative m-auto w-full max-w-2xl">
      <div class="bg-white w-full rounded shadow-2xl flex flex-col">
        <div class="bg-black flex flex-row">
          <h4 class="p-4 m-1 w-1/24 mr-auto ml-2 font-bold text-white">
            Create New
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
              placeholder="Project"
            />
            <div
              v-if="name"
              @click="insert"
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
  name: "Insert-Project",
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
    ...mapActions(["insertProject", "getProject"]),
    insert() {
      const data = {
        name: this.name
      };
      const project = {
        userId: this.$route.params.id,
        page: this.projectLinks.currentPage
      };
      if (project.userId === this.userId) {
        this.insertProject(data)
          .then(() => {
            this.getProject(project);
            this.$swal.fire("Add project", "successfully", "success");
          })
          .catch(err => {
            this.$swal.fire(
              "Failed to add project",
              "Project " + err.response.data.message,
              "error"
            );
          });
      } else {
        this.$swal.fire("Failed to add project", "Access denied", "warning");
      }

      this.toggleModal = false;
      this.name = "";
    }
  }
};
</script>
