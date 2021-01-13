import axios from "axios";

const employeeShare = {
  state: {
    linkValues: [],
    linkValue: {}
  },
  getters: {
    linkValues(state) {
      return state.linkValues;
    },
    linkValue(state) {
      return state.linkValue;
    }
  },
  mutations: {
    setLinkValues(state, payload) {
      state.linkValues = payload;
      state.linkValue = payload[0];
    }
  },
  actions: {
    getLinks(setex, payload) {
      let filter = "?";
      let idEmployee = "";
      let limit = "";
      let link = "";

      if (payload.idEmployee) {
        idEmployee = `filter[idEmployee]=${payload.idEmployee}&`;
      }

      if (payload.link) {
        link = `filter[shareLink]=${payload.link}&`;
      }

      if (payload.limit) {
        limit = `limit=${payload.limit}`;
      }

      filter += idEmployee + link + limit;
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_API_ENDPOINT + "/employee-share" + filter)
          .then(res => {
            console.log(res);
            setex.commit("setLinkValues", res.data.data);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    insertLink(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_API_ENDPOINT + "/employee-share", payload)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    updateLink(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            process.env.VUE_APP_API_ENDPOINT + "/employee-share/" + payload.id,
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
    deleteLink(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            process.env.VUE_APP_API_ENDPOINT + "/employee-share/" + payload
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

export default employeeShare;
