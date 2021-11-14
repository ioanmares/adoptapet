import { createApp } from "vue";

import router from "./routes";

import App from "./App.vue";

import "./index.css";

const app = createApp(App);

app.provide("user", { id: "9ecd874c-d410-4917-ad68-1acd1f0bbe90" });

app.use(router);

app.mount("#app");
