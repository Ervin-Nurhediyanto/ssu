import axios from "axios";
import router from "../../../router/index";

const user = {
  state: {
    user: {},
    users: [],
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("username") || null,
    userId: localStorage.getItem("userId") || null,
    email: localStorage.getItem("email") || null,
    emailVerificationCode: localStorage.getItem("emailVerificationCode") || null
  },
  getters: {
    isLogin(state) {
      return state.token !== null;
    },
    username(state) {
      return state.username;
    },
    user(state) {
      return state.user;
    },
    users(state) {
      return state.users;
    },
    userId(state) {
      return state.userId;
    },
    email(state) {
      return state.email;
    },
    emailVerificationCode(state) {
      return state.emailVerificationCode;
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      state.token = payload.access_token;
      state.username = payload.username;
      state.userId = payload._id;
    },
    setUsers(state, payload) {
      state.users = payload;
    },
    setToken(state, payload) {
      state.token = payload;
    }
  },
  actions: {
    interceptorsResponse(setex) {
      axios.interceptors.response.use(
        function(response) {
          return response;
        },
        function(error) {
          console.log(error);
          if (error.code === 401) {
            localStorage.removeItem("token");
            setex.commit("setToken", null);
            router.push("/auth/signin");
          }
          return Promise.reject(error);
        }
      );
    },
    interceptorsRequest(setex) {
      console.log("interse");
      axios.interceptors.request.use(
        function(config) {
          config.headers.Authorization = `Bearer ${setex.state.token}`;
          return config;
        },
        function(error) {
          return Promise.reject(error);
        }
      );
    },
    login(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_API_ENDPOINT + "/auth/login", payload)
          .then(res => {
            console.log(res.data.data);
            setex.commit("setUser", res.data.data);
            localStorage.setItem("token", res.data.data.access_token);
            localStorage.setItem("username", res.data.data.username);
            localStorage.setItem("userId", res.data.data._id);
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    register(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_API_ENDPOINT + "/auth/register", payload)
          .then(res => {
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    forgotPassword(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            process.env.VUE_APP_API_ENDPOINT + "/users/forgot-password",
            payload
          )
          .then(res => {
            localStorage.setItem("email", res.data.data.email);
            localStorage.setItem(
              "emailVerificationCode",
              res.data.data.emailVerificationCode
            );
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    resetPassword(setex, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            process.env.VUE_APP_API_ENDPOINT + "/users/reset-password",
            payload
          )
          .then(res => {
            localStorage.removeItem("email");
            localStorage.removeItem("emailVerificationCode");
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getAllUser(setex) {
      return new Promise((resolve, reject) => {
        // console.log(payload)
        axios
          .get(process.env.VUE_APP_API_ENDPOINT + "/users")
          .then(res => {
            setex.commit("setUsers", res.data.data);
            resolve(res);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    logout() {
      return new Promise(resolve => {
        const items = { ...localStorage };
        Object.keys(items).map(item => {
          localStorage.removeItem(item);
        });
        resolve();
      });
    }
  }
};

export default user;
