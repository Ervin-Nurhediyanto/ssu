import axios from "axios";

const employee = {
  state: {
    employees: [],
    employeeLinks: [],
    employeeId: localStorage.getItem("employeeId") || null
  },
  getters: {
    employees(state) {
      return state.employees;
    },
    employeeLinks(state) {
      return state.employeeLinks;
    },
    employeeId(state) {
      return state.employeeId;
    }
  },
  mutations: {
    setEmployees(state, payload) {
      state.employees = payload;
    },
    setEmployeeLinks(state, payload) {
      state.employeeLinks = payload;
    },
    setEmployeeId(state, payload) {
      state.employeeId = payload;
    }
  },
  actions: {
    getEmployees(setex, payload) {
      return new Promise((resolve, reject) => {
        let filter = "?";
        let userId = "";
        let projectId = "";
        let name = "";
        let page = "";

        if (payload.userId) {
          userId = `filter[createdBy]=${payload.userId}&`;
        }

        if (payload.projectId) {
          projectId = `filter[idProject]=${payload.projectId}&`;
        }

        if (payload.name) {
          name = `filter[name]=${payload.name}&`;
        }

        if (payload.page) {
          page = `limit=8&skip=${(payload.page - 1) * 8}`;
        }

        filter += userId + projectId + name + page;

        axios
          .get(process.env.VUE_APP_API_ENDPOINT + "/employees" + filter)
          .then(res => {
            setex.commit("setEmployees", res.data.data);
            setex.commit("setEmployeeLinks", res.data.links);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    insertEmployee(setex, payload) {
      console.log(payload);
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_API_ENDPOINT + "/employees", payload)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getEmployeeId(setex, payload) {
      return new Promise(resolve => {
        setex.commit("setEmployeeId", payload);
        localStorage.setItem("employeeId", payload);
        resolve();
      });
    },
    removeEmployeeId(setex) {
      return new Promise(resolve => {
        setex.commit("setEmployeeId", null);
        localStorage.removeItem("employeeId");
        resolve();
      });
    },
    updateEmployee(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            process.env.VUE_APP_API_ENDPOINT + "/employees/" + payload.id,
            payload.data
          )
          .then(() => {
            resolve();
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    }
  }
};

export default employee;
