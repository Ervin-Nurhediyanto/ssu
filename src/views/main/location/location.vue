<template>
  <div class="mr-5">
    <div class="border-2 border-gray-200 bg-black flex flex-row">
      <Add />
      <Search />
    </div>
    <div class="my-3">
      <Sync />
    </div>
    <div>
      <table class="border-2 border-b-0 border-gray-400 w-full bg-white">
        <tr class="border-2 border-gray-400 bg-gray-300">
          <th class="p-2 border-2 border-gray-400">No</th>
          <th class="p-2 border-2 border-gray-400">Location</th>
          <th class="p-2 border-2 border-gray-400">UMK</th>
          <th class="p-2 border-2 border-gray-400">UMK Job Value</th>
          <th class="p-2 border-2 border-gray-400">Action</th>
        </tr>
        <tr v-for="(location, index) in locations" :key="index">
          <td class="text-center border-2 border-gray-400 w-20">
            {{ index + 1 }}
          </td>
          <td class="text-center border-2 border-gray-400">
            {{ location.location }}
          </td>
          <td class="text-center border-2 border-gray-400">
            Rp.{{ location.minimumWage }}
          </td>
          <td class="text-center border-2 border-gray-400 w-40">
            {{ location.jobValue }}
          </td>
          <td class="text-center border-2 border-gray-400 w-20">
            <Edit :id="location._id" :location="location" />
          </td>
        </tr>
      </table>

      <Page />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import Add from "../../../components/locations/modal-insert";
import Search from "../../../components/locations/search";
import Sync from "../../../components/locations/sync";
import Edit from "../../../components/locations/modal-update";
import Page from "../../../components/locations/pagination";

export default {
  name: "Location",
  data() {
    return {
      search: ""
    };
  },
  components: {
    Add,
    Search,
    Sync,
    Edit,
    Page
  },
  mounted() {
    if (this.userId && this.projectId) {
      const payload = {
        userId: this.$route.params.id,
        page: 1
      };
      this.getLocations(payload);
    } else {
      this.$router.push("/");
    }
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      projectId: "projectId",
      project: "project",
      locations: "locations",
      locationLink: "locationLink"
    })
  },
  methods: {
    ...mapActions(["getLocations"])
  }
};
</script>
