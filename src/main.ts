import { createApp } from "vue";
import { CIcon } from "@coreui/icons-vue";
import "./style.css";
import App from "./App.vue";

createApp(App).component("CIcon", CIcon).mount("#app");
