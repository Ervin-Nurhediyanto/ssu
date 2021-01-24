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
            Edit Location
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
              <label for="name" class="mr-4 my-auto w-40">Location</label>
              <input
                readonly
                type="text"
                class="border-2 border-black w-full rounded-sm p-1"
                :value="location.location"
              />
            </div>
            <div class="flex flex-row w-full mb-4">
              <label for="name" class="mr-4 my-auto w-40">UMK</label>
              <input
                v-model="umkValue"
                type="text"
                class="border-2 border-black w-full rounded-sm p-1"
                :placeholder="location.minimumWage"
              />
            </div>
            <div class="flex flex-row w-full mb-4">
              <label for="name" class="mr-4 my-auto w-40">UMK Job Value</label>
              <input
                v-model="jobVal"
                type="text"
                class="border-2 border-black w-full rounded-sm p-1"
                :placeholder="location.jobValue"
              />
            </div>
            <div class="flex justify-end">
              <div
                v-if="locationName && umkValue && jobVal"
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
  name: "Update-Location",
  props: ["id", "location", "umk", "jobValue"],
  data() {
    return {
      toggleModal: false,
      locationName: "",
      umkValue: "",
      jobVal: ""
    };
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      locations: "locations",
      locationLink: "locationLink"
    })
  },
  methods: {
    ...mapActions(["updateLocation", "getLocations"]),
    update() {
      const payload = {
        id: this.id,
        data: {
          location: this.locationName,
          minimumWage: this.umkValue,
          jobValue: this.jobVal
        }
      };
      const location = {
        userId: this.$route.params.id,
        page: this.locationLink.currentPage
      };
      if (this.location.createdBy === this.userId) {
        this.updateLocation(payload)
          .then(() => {
            this.getLocations(location);
            this.$swal.fire("Update location", "successfully", "success");
          })
          .catch(err => {
            this.$swal.fire(
              "Failed to update location",
              payload.data.location + " " + err.response.data.message,
              "error"
            );
          });
      } else {
        this.$swal.fire(
          "Failed to update location",
          "Access denied",
          "warning"
        );
      }

      this.toggleModal = false;
      this.locationName = "";
      this.umkValue = "";
      this.jobVal = "";
    }
  }
};
</script>
