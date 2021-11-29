import { defineNuxtPlugin, useRuntimeConfig } from "#app";
import VueGtag from "vue-gtag";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  nuxtApp.vueApp.use(VueGtag, {
    config: { id: config.gaMeasurementId || "" },
  });
});
