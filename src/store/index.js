import { createStore } from "vuex";
import Users from "./modules/users/users";
import Projects from "./modules/projects/projects";
import Employees from "./modules/employees/employees";
import EmployeeValues from "./modules/employee-value/employee-values";
import EmployeeShare from "./modules/employee-share/employee-share";
import Location from "./modules/locations/locations";
import JobValue from "./modules/job-value/job-jalue";

export default createStore({
  state: {
    subTitle: localStorage.getItem("subTitle") || null
  },
  getters: {
    subTitle(state) {
      return state.subTitle;
    }
  },
  mutations: {
    setSubTitle(state, payload) {
      state.subTitle = payload;
    }
  },
  actions: {
    getSubTitle(setex, payload) {
      setex.commit("setSubTitle", payload);
      localStorage.setItem("subTitle", payload);
    },
    removeSubTitle(setex) {
      setex.commit("setSubTitle", null);
      localStorage.removeItem("subTitle");
    },
    cancel(setex, payload) {
      return new Promise(resolve => {
        localStorage.removeItem(payload);
        resolve();
      });
    }
  },
  modules: {
    Users,
    Projects,
    Employees,
    EmployeeValues,
    EmployeeShare,
    Location,
    JobValue
  }
});
