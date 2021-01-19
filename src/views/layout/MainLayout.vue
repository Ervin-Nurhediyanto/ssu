<template>
  <div class="ml-4">
    <Notif />
    <div class="flex flex-row">
      <!-- <Notif /> -->
      <div class="ml-auto mr-2">
        <User />
      </div>
    </div>
    <div class="bg-white text-blue-400 h-10 w-sreen mr-5 p-2">
      <span
        @click.prevent="projectPage"
        class="cursor-pointer hover:text-red-400"
        >Projects
      </span>
      <span> >> </span>
      <span v-for="(option, index) in options" :key="index">
        <span
          v-if="title === option.title"
          @click.prevent="changeTittle(option)"
          class="cursor-pointer hover:text-red-400"
          >{{ title }}</span
        >
      </span>
      <span v-if="title === 'Employee List' && subTitle"> >> </span>
      <span
        v-if="title === 'Employee List'"
        class="cursor-pointer hover:text-red-400"
        >{{ subTitle }}</span
      >
      <span v-if="employeeId" class="cursor-pointer hover:text-red-400">
        >
        <span @click.prevent="historyPage" class="hover:text-red-500"
          >History</span
        ></span
      >
    </div>
    <div class="my-4 flex flex-row">
      <div v-for="(option, index) in options" :key="index" class="">
        <button
          v-if="title === option.title"
          class="p-1 sm:w-28 md:w-32 lg:w-40 rounded-t-xl border-2 border-black"
          @click.prevent="changeTittle(option)"
        >
          {{ option.title }}
        </button>
        <button
          v-else
          class="p-1 sm:w-28 md:w-32 lg:w-40 rounded-t-xl border-2 border-black bg-white"
          @click.prevent="changeTittle(option)"
        >
          {{ option.title }}
        </button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import User from "../../components/users/user";
import Notif from "../../components/users/notification";

export default {
  name: "Main-Layout",
  data() {
    return {
      title: "Employee List",
      options: [
        {
          title: "Employee List",
          route: "Employee"
        },
        {
          title: "Job Location",
          route: "Location"
        },
        {
          title: "Job Value",
          route: "Job Value"
        }
      ]
    };
  },
  components: {
    User,
    Notif
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      projectId: "projectId",
      employeeId: "employeeId",
      subTitle: "subTitle",
      valueId: "valueId"
    })
  },
  methods: {
    ...mapActions(["removeEmployeeId", "removeSubTitle"]),
    changeTittle(value) {
      this.title = value.title;
      if (value.route === "Location") {
        this.$router.replace({
          name: value.route,
          params: { id: this.userId }
        });
        this.removeEmployeeId();
        this.removeSubTitle();
      } else {
        this.$router.replace({
          name: value.route,
          params: { id: this.projectId }
        });
        this.removeEmployeeId();
        this.removeSubTitle();
      }
    },
    historyPage() {
      this.$router.replace({
        name: "Employee-History",
        params: { id: this.employeeId }
      });
    },
    projectPage() {
      this.$router.replace({
        name: "Project",
        params: { id: this.userId }
      });
    }
  }
};
</script>
