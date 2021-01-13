import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faPlus,
  faTrash,
  faPen,
  faShareAlt,
  faHistory
} from "@fortawesome/free-solid-svg-icons";
import VueApexCharts from "vue3-apexcharts";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

library.add(faPlus, faPen, faTrash, faShareAlt, faHistory);

createApp(App)
  .component("icon", FontAwesomeIcon)
  .use(VueSweetalert2)
  .use(VueApexCharts)
  .use(store)
  .use(router)
  .mount("#app");
