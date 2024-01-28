import renderMessage from "./render.js";
import templateFunc from "./template.js";

function addMinutes(date, diff) {
    return new Date(date.getTime() + diff*60000);
}


function nextDate(date) {
    const tomorrow = new Date(date.getTime());
    tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
    return tomorrow;
}

function calcNum(date) {
    const beginNum = 11530326;
    const beginDate = Date.parse("2023-12-25T14:13:04.000Z");
    const diff = date.getTime() - beginDate;
    const magic = 0.49195; // (12847765-11530326) / (31*24*60*60);
    const result = beginNum + Math.floor(magic * diff / 1000);
    console.log(beginDate, diff, magic, result);
    return result;
}

function generate_impl() {
    const date = addMinutes(new Date(), -10);
    const templater = templateFunc();
    const to = { text: "C1", date: date, direction: "to"};
    const from = { text: templater.C1(nextDate(date), calcNum(date)), date: date, direction: "from"};
    return {
        "name": "last_trip",
        "messages" : [to, from]
    };
}

export default async function generate(window, document) {
    const list = document.querySelector("main");
    const data = generate_impl();
    for (const message of data.messages) {
        renderMessage(message, document, list);
        // console.log("data", message);
    }
}
