<template>
  <icon
    :icon="['fas', 'share-alt']"
    class="mx-1 cursor-pointer"
    @click="handleShare"
  />
  <div
    v-if="toggleModal"
    class="fixed overflow-x-hidden overflow-y-auto inset-0 flex justify-center item-center z-50"
  >
    <div class="relative m-auto w-full max-w-2xl">
      <div class="bg-white w-full rounded shadow-2xl flex flex-col ">
        <div class="bg-black flex flex-row">
          <h4 class="p-4 m-1 w-1/24 mr-auto ml-2 font-bold text-white">
            Share Link
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
            <div class="flex flex-col w-full mb-4 text-left">
              <div class="flex flex-row">
                <div class="w-40">Link Salary</div>
                <icon
                  :icon="['fas', 'plus']"
                  class="mx-1 cursor-pointer"
                  @click="linkSalary"
                />
              </div>
              <div class="flex flex-col">
                <div v-for="(link, index) in linkValues" :key="index">
                  <div
                    v-if="link.shareLink && link.salaryAccess === true"
                    class="flex flex-row"
                  >
                    <div
                      class="text-blue-400 underline w-3/4 hover:text-red-400"
                    >
                      <div
                        class="cursor-pointer"
                        @click.prevent="openLink(link.shareLink)"
                      >
                        <a :href="url + link.shareLink">{{
                          url + link.shareLink
                        }}</a>
                      </div>
                    </div>
                    <div>
                      <Delete
                        :id="link._id"
                        :creator="link.createdBy"
                        :idEmployee="link.idEmployee"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-row mt-4">
                <div class="w-40">Link Tanpa Salary</div>
                <icon
                  :icon="['fas', 'plus']"
                  class="mx-1 cursor-pointer"
                  @click="linkNonSalary"
                />
              </div>
              <div class="flex flex-col">
                <div v-for="(link, index) in linkValues" :key="index">
                  <div
                    v-if="link.shareLink && link.salaryAccess === false"
                    class="flex flex-row"
                  >
                    <div
                      class="text-blue-400 underline w-3/4 hover:text-red-400"
                    >
                      <div
                        class="cursor-pointer"
                        @click.prevent="openLink(link.shareLink)"
                      >
                        <a :href="url + link.shareLink">{{
                          url + link.shareLink
                        }}</a>
                      </div>
                    </div>
                    <div>
                      <Delete
                        :id="link._id"
                        :creator="link.createdBy"
                        :idEmployee="link.idEmployee"
                      />
                    </div>
                  </div>
                </div>
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
import Delete from "../employee-share/delete";

export default {
  name: "Share-Value",
  props: ["id"],
  data() {
    return {
      toggleModal: false,
      url: ""
    };
  },
  components: {
    Delete
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      projectId: "projectId",
      linkValues: "linkValues"
    })
  },
  mounted() {
    console.log(this.id);
    this.url = process.env.VUE_APP_DOMAIN + "/employee-share/";
  },
  methods: {
    ...mapActions(["insertLink", "getLinks"]),
    linkSalary() {
      const payload = {
        idEmployee: this.id,
        salaryAccess: "true"
      };
      this.insertLink(payload)
        .then(() => {
          const payload = {
            idEmployee: this.id,
            limit: Math.pow(10, 1000)
          };
          this.getLinks(payload);
        })
        .catch(err => {
          console.log(err);
        });
    },
    linkNonSalary() {
      const payload = {
        idEmployee: this.id,
        salaryAccess: "false"
      };
      this.insertLink(payload)
        .then(() => {
          const payload = {
            idEmployee: this.id,
            limit: Math.pow(10, 1000)
          };
          this.getLinks(payload);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleShare() {
      this.toggleModal = !this.toggleModal;
      const payload = {
        idEmployee: this.id,
        limit: Math.pow(10, 1000)
      };
      this.getLinks(payload);
    },
    openLink(link) {
      this.$router.replace({
        name: "Employee-Share",
        params: { id: link }
      });
    }
  }
};
</script>
