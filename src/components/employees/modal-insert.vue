<template>
  <icon
    :icon="['fas', 'plus']"
    class="m-2 text-gray-200 cursor-pointer"
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
            Add Employee
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
              <label for="name" class="mr-14 my-auto w-40">Name</label>
              <input
                v-model="name"
                type="text"
                class="border-2 border-black w-full rounded-sm p-1"
                placeholder="-- Employee --"
              />
            </div>
            <div class="flex flex-row w-full mb-4">
              <label for="name" class="mr-4 my-auto w-40">Job Location</label>
              <select
                v-model="idLocation"
                class="border-2 border-black w-3/4 rounded-sm p-1"
              >
                <option value="" disabled selected class="p-2"
                  >-- Select --</option
                >
                <option
                  v-for="(location, index) in locations"
                  :key="index"
                  :value="location._id"
                  class="p-2"
                  >{{ location.location }}</option
                >
              </select>
            </div>
            <div class="flex flex-row justify-end mt-4">
              <div
                v-if="name && idLocation"
                @click="toggleModal = false"
                class="bg-gray-100 px-3 w-20 border-2 border-black rounded-md cursor-pointer"
              >
                Cancel
              </div>
              <div
                v-if="name && idLocation"
                @click="insert"
                class="bg-gray-100 ml-4 px-5 w-20 border-2 border-black rounded-md cursor-pointer"
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
  name: "Insert-Employee",
  props: ["id", "locations", "employees"],
  data() {
    return {
      toggleModal: false,
      name: "",
      idLocation: ""
    };
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      project: "project",
      employeeLinks: "employeeLinks"
    })
  },
  mounted() {},
  methods: {
    ...mapActions(["insertEmployee", "getEmployees", "getLocations"]),
    insert() {
      const data = {
        name: this.name,
        idProject: this.$route.params.id,
        idLocation: this.idLocation
      };
      const payload = {
        userId: this.userId,
        projectId: this.$route.params.id,
        page: this.employeeLinks.currentPage
      };
      if (this.project[0].createdBy === this.userId) {
        this.insertEmployee(data)
          .then(() => {
            this.getEmployees(payload);
            this.$swal.fire("Add employee", "successfully", "success");
          })
          .catch(err => {
            this.$swal.fire(
              "Failed to add employee",
              err.response.data.message,
              "error"
            );
          });
      } else {
        this.$swal.fire("Failed to add employee", "Access denied", "warning");
      }

      this.toggleModal = false;
      this.name = "";
      this.idLocation = "";
    }
  }
};
</script>
