import axios from "axios";

const employee = {
  state: {
    value: [],
    values: [],
    valueId: localStorage.getItem("valueId") || null,
    valueLinks: {}
  },
  getters: {
    value(state) {
      return state.value;
    },
    values(state) {
      return state.values;
    },
    valueId(state) {
      return state.valueId;
    },
    valueLinks(state) {
      return state.valueLinks;
    }
  },
  mutations: {
    setValue(state, payload) {
      state.value = payload;
    },
    setValues(state, payload) {
      state.values = payload;
    },
    setValueId(state, payload) {
      state.valueId = payload;
    },
    setValueLinks(state, payload) {
      state.valueLinks = payload;
    }
  },
  actions: {
    getValues(setex, payload) {
      let filter = "?";
      let idEmployee = "";
      let status = "";
      let nameCreator = "";
      let page = "";

      if (payload.idEmployee) {
        idEmployee = `filter[idEmployee]=${payload.idEmployee}&`;
      }

      if (payload.status) {
        status = `filter[status]=${payload.status}&`;
      }

      if (payload.nameCreator) {
        nameCreator = `filter[nameCreator]=${payload.nameCreator}&`;
      }

      if (payload.page) {
        page = `limit=8&skip=${(payload.page - 1) * 8}`;
      }

      filter += idEmployee + status + nameCreator + page;

      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_API_ENDPOINT + "/employee-values" + filter)
          .then(res => {
            console.log(res);
            setex.commit("setValues", res.data.data);
            setex.commit("setValueLinks", res.data.links);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    detailValue(setex, id) {
      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_API_ENDPOINT + "/employee-values/" + id)
          .then(res => {
            setex.commit("setValue", res.data.data[0]);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    insertValue(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_API_ENDPOINT + "/employee-values", payload)
          .then(res => {
            setex.commit("setValueId", res.data.created._id);
            localStorage.setItem("valueId", res.data.created._id);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    updateValue(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            process.env.VUE_APP_API_ENDPOINT + "/employee-values/" + payload.id,
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
    deleteValue(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .delete(
            process.env.VUE_APP_API_ENDPOINT + "/employee-values/" + payload
          )
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    removeValueId(setex) {
      return new Promise(resolve => {
        setex.commit("setValueId", null);
        localStorage.removeItem("valueId");
        resolve();
      });
    }
  }
};

export default employee;
