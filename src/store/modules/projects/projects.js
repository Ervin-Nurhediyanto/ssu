import axios from "axios";

const project = {
  state: {
    projects: [],
    project: {},
    projectLinks: {},
    projectId: localStorage.getItem("projectId") || null
  },
  getters: {
    projects(state) {
      return state.projects;
    },
    project(state) {
      return state.project;
    },
    projectLinks(state) {
      return state.projectLinks;
    },
    projectId(state) {
      return state.projectId;
    }
  },
  mutations: {
    setProjects(state, payload) {
      state.projects = payload;
    },
    setProject(state, payload) {
      state.project = payload;
      state.projectId = payload[0]._id;
    },
    setProjectLinks(state, payload) {
      state.projectLinks = payload;
    }
  },
  actions: {
    getProject(setex, payload) {
      return new Promise((resolve, reject) => {
        let filter = "?";
        let userId = "";
        let name = "";
        let page = "";

        if (payload.userId) {
          userId = `filter[createdBy]=${payload.userId}&`;
        }

        if (payload.name) {
          name = `filter[name]=${payload.name}&`;
        }

        if (payload.page) {
          page = `limit=8&skip=${(payload.page - 1) * 8}`;
        }

        filter += userId + name + page;

        axios
          .get(process.env.VUE_APP_API_ENDPOINT + "/projects" + filter, payload)
          .then(res => {
            setex.commit("setProjects", res.data.data);
            setex.commit("setProjectLinks", res.data.links);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getDetailProject(setex, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_API_ENDPOINT + "/projects/" + id)
          .then(res => {
            setex.commit("setProject", res.data.data);
            localStorage.setItem("projectId", res.data.data[0]._id);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    insertProject(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_API_ENDPOINT + "/projects", payload)
          .then(res => {
            console.log(res);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    updateProject(setex, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        axios
          .put(
            process.env.VUE_APP_API_ENDPOINT + "/projects/" + payload.id,
            payload.data
          )
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    deleteProject(setex, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(process.env.VUE_APP_API_ENDPOINT + "/projects/" + id)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};

export default project;
