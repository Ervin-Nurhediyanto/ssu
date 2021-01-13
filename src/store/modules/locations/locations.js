import axios from "axios";

const location = {
  state: {
    locations: [],
    locationLinks: {}
  },
  getters: {
    locations(state) {
      return state.locations;
    },
    locationLink(state) {
      return state.locationLinks;
    }
  },
  mutations: {
    setLocations(state, payload) {
      state.locations = payload;
    },
    setLocationLinks(state, payload) {
      state.locationLinks = payload;
    }
  },
  actions: {
    getLocations(setex, payload) {
      return new Promise((resolve, reject) => {
        let filter = "?";
        let userId = "";
        let location = "";
        let page = "";

        if (payload.userId) {
          userId = `filter[createdBy]=${payload.userId}&`;
        }

        if (payload.location) {
          location = `filter[location]=${payload.location}&`;
        }

        if (payload.page) {
          page = `limit=8&skip=${(payload.page - 1) * 8}`;
        }

        filter += userId + location + page;

        axios
          .get(process.env.VUE_APP_API_ENDPOINT + "/locations" + filter)
          .then(res => {
            setex.commit("setLocations", res.data.data);
            setex.commit("setLocationLinks", res.data.links);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    insertLocation(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_API_ENDPOINT + "/locations", payload)
          .then(res => {
            console.log(res);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    updateLocation(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .put(
            process.env.VUE_APP_API_ENDPOINT + "/locations/" + payload.id,
            payload.data
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

export default location;
