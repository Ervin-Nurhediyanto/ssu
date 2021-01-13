<template>
  <div class="ml-4">
    <div class="ml-auto mr-2">
      <User />
    </div>
    <div class="bg-white h-10 w-sreen mr-5 p-2">
      <span class="cursor-pointer text-blue-400 hover:text-red-400"
        >Projects</span
      >
    </div>
    <div class="m-4 text-2xl">Projects</div>
    <div class="border-t-8 border-l-8 border-gray-100 mr-5 p-4 bg-white">
      <div class="border-2 border-gray-200 bg-gray-100 flex flex-row">
        <Add />
        <Search />
      </div>
      <hr class="border-b-2 border-gray-300 my-4" />
      <table class="w-full">
        <tr class="border-black border-b-4 border-fuchsia-600">
          <th class="w-1 p-2">No.</th>
          <th class="p-2 flex justify-start">Name</th>
          <th class="w-1 p-2" colspan="2"></th>
        </tr>
        <tr v-for="(project, index) in projects" :key="index">
          <td class="w-1 p-2">{{ index + 1 }}.</td>
          <td class="p-2 text-blue-500 underline flex justify-start">
            <h4
              @click.prevent="handleProject(project._id, project.createdBy)"
              class="cursor-pointer"
            >
              {{ project.name }}
            </h4>
          </td>
          <td class="w-1 p-2">
            <Edit :id="project._id" :project="project" />
          </td>
          <td class="w-1 p-2">
            <Delete :id="project._id" :project="project" />
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
import User from "../../components/users/user";
import Add from "../../components/projects/modal-insert";
import Edit from "../../components/projects/modal-update";
import Delete from "../../components/projects/modal-delete";
import Search from "../../components/projects/search";
import Page from "../../components/projects/pagination";

export default {
  name: "Project",
  data() {
    return {};
  },
  components: {
    User,
    Add,
    Edit,
    Delete,
    Search,
    Page
  },
  mounted() {
    const payload = {
      userId: this.$route.params.id,
      page: 1
    };
    this.getProject(payload);
  },
  computed: {
    ...mapGetters({
      userId: "userId",
      projects: "projects",
      project: "project"
    })
  },
  methods: {
    ...mapActions(["getProject", "getDetailProject"]),
    handleProject(id, userId) {
      if (userId === this.userId) {
        this.getDetailProject(id).then(res => {
          this.$router.replace({
            name: "Employee",
            params: { id: res.data.data[0]._id }
          });
        });
      } else {
        alert("Access denied");
      }
    },
    edit(id) {
      this.getDetailProject(id);
    }
  }
};
</script>

<style></style>
