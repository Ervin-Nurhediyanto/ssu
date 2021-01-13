import axios from "axios";
import group from "./group/group";
import criteria from "./criteria/criteria";
import level from "./level/level";

const jobValue = {
  state: {
    jobValues: {}
  },
  getters: {
    jobValues(state) {
      return state.jobValues;
    }
  },
  mutations: {
    setJobValues(state, payload) {
      state.jobValues = payload;
    }
  },
  actions: {
    getJobValues(setex, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_API_ENDPOINT + "/projects/" + id)
          .then(res => {
            console.log(res.data.data[0]);
            setex.commit("setJobValues", res.data.data[0]);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  },
  modules: {
    group,
    criteria,
    level
  }
};

export default jobValue;
