import axios from "axios";

const criteria = {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    insertCriteria(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_API_ENDPOINT + "/factor-criterias", payload)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    updateCriteria(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            process.env.VUE_APP_API_ENDPOINT +
              "/factor-criterias/" +
              payload.id,
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
    deleteCriteria(setex, payload) {
      console.log(payload.data);
      return new Promise((resolve, reject) => {
        axios
          .delete(
            process.env.VUE_APP_API_ENDPOINT +
              "/factor-criterias/" +
              payload.id,
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

export default criteria;
