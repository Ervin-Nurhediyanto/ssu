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
            Add Location
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
              <label for="name" class="mr-14 my-auto w-40">Location</label>
              <input
                v-model="location"
                type="text"
                class="border-2 border-black w-full rounded-sm p-1"
                placeholder="-- Location --"
              />
            </div>
            <div class="flex flex-row w-full mb-4">
              <label for="UMK" class="mr-14 my-auto w-40">UMK</label>
              <input
                v-model="minimumWage"
                type="text"
                class="border-2 border-black w-full rounded-sm p-1"
                placeholder="-- UMK --"
              />
            </div>
            <div class="flex flex-row w-full mb-4">
              <label for="UMK-Job-Value" class="mr-14 my-auto w-40"
                >UMK Job Value</label
              >
              <input
                v-model="jobValue"
                type="text"
                class="border-2 border-black w-full rounded-sm p-1"
                placeholder="-- UMK Job Value --"
              />
            </div>
            <div class="flex flex-row justify-end mt-4">
              <div
                v-if="location && minimumWage && jobValue"
                @click="toggleModal = false"
                class="bg-gray-100 px-3 w-20 border-2 border-black rounded-md cursor-pointer"
              >
                Cancel
              </div>
              <div
                v-if="location && minimumWage && jobValue"
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
  name: "Insert-Location",
  data() {
    return {
      toggleModal: false,
      location: "",
      minimumWage: "",
      jobValue: ""
    };
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      locationLink: "locationLink"
    })
  },
  mounted() {},
  methods: {
    ...mapActions(["insertLocation", "getLocations"]),
    insert() {
      const data = {
        location: this.location,
        minimumWage: Number(this.minimumWage),
        jobValue: Number(this.jobValue)
      };
      const payload = {
        userId: this.$route.params.id,
        page: this.locationLink.currentPage
      };
      if (payload.userId === this.userId) {
        this.insertLocation(data)
          .then(() => {
            this.getLocations(payload);
            this.$swal.fire("Add location", "successfully", "success");
          })
          .catch(err => {
            this.$swal.fire(
              "Failed to add location",
              data.location + " " + err.response.data.message,
              "error"
            );
          });
      } else {
        this.$swal.fire("Failed to add location", "Access denied", "warning");
      }

      this.toggleModal = false;
    }
  }
};
</script>
