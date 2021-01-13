<template>
  <icon
    :icon="['fas', 'trash']"
    class="mx-2 cursor-pointer hover:text-red-400"
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
            Delete History
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
              Do you really want to delete ? This process cannot be undone.
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
  name: "Delete-Link",
  props: ["id", "creator", "idEmployee"],
  data() {
    return {
      toggleModal: false
    };
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      project: "project",
      valueLinks: "valueLinks"
    })
  },
  methods: {
    ...mapActions(["deleteLink", "getLinks"]),
    handleDelete() {
      const payload = {
        idEmployee: this.idEmployee,
        limit: 100
      };

      if (this.creator === this.userId) {
        this.deleteLink(this.id)
          .then(() => this.getLinks(payload))
          .catch(err => {
            alert(err);
          });
      } else {
        alert("Access denied");
      }

      this.toggleModal = false;
    }
  }
};
</script>
