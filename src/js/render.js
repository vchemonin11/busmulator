function escapeBr(text) {
    return text.replaceAll("\n", "<br>");
}

function chompCurrentYear(str) {
    return str.replaceAll("." + new Date().getFullYear(), "");
}

function formatDateTime(date) {
    const timeZone = "Europe/Belgrade";
    const str = date.toLocaleString("ru-RU", { timeZone: timeZone });
    const withoutComma = str.replaceAll(",", " ");
    return chompCurrentYear(withoutComma).slice(0, -3);
}

function colorizeDigits(str) {
    return str.replace(/([\d.]{4,}\d)/g, "<span class='colorize'>$1</span>");
}

function renderMessageTo(message, template) {
    const el = template.content.cloneNode(true);
    el.querySelector(".message-text").textContent = message.text;
    let date = message.date;
    if (typeof message.date === "string") {
        date = new Date(Date.parse(message.date));
    }
    el.querySelector(".date").textContent = formatDateTime(date);
    return el;
}

function renderMessageFrom(message, template) {
    const el = template.content.cloneNode(true);
    const html = colorizeDigits(escapeBr(message.text));
    // console.log(html);
    el.querySelector(".message-text").innerHTML = html;
    return el;
}

function fixScroll(document) {
    const objDiv = document.querySelector("main");
    objDiv.scrollTop = objDiv.scrollHeight;

    document.querySelector("input").focus();
}

export default function renderMessage(message, document, el) {
    if (message.direction === "to") {
        const render = renderMessageTo(message, document.querySelector("#message-to-tmpl"));
        el.appendChild(render.firstElementChild);
    } else if (message.direction === "from") {
        const render = renderMessageFrom(message, document.querySelector("#message-from-tmpl"));
        el.appendChild(render.firstElementChild);
    } else {
        console.error(message);
    }
    fixScroll(document);
}
