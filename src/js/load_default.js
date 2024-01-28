import renderMessage from "./render.js";

export default async function load(window, document, dataUrl) {
    const data = await fetch(dataUrl).then(resp => resp.json());
    const list = document.querySelector("main");
    for (const message of data.messages) {
        renderMessage(message, document, list);
    }
}
