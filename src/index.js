"use strict";
import loader from "./js/load_default.js";
import generate from "./js/generate_last_trip.js";

// eslint-disable-next-line no-undef
if (__USE_SERVICE_WORKERS__) {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("./sw.js", {scope: "./"});
    }
}

const dataUrl = "./data/default_sms.json";
await loader(window, document, dataUrl);
await generate(window, document);
