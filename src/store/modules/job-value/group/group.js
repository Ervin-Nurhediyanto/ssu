import axios from "axios";

const group = {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    insertGroup(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_API_ENDPOINT + "/factor-groups", payload)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    updateGroup(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            process.env.VUE_APP_API_ENDPOINT + "/factor-groups/" + payload.id,
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
    deleteGroup(setex, payload) {
      console.log(payload.data);
      return new Promise((resolve, reject) => {
        axios
          .delete(
            process.env.VUE_APP_API_ENDPOINT + "/factor-groups/" + payload.id,
            { data: payload.data }
          )
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

export default group;
