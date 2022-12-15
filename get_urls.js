
// ==UserScript==
// @name        geturls
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       GM_registerMenuCommand
// @version     1.0
// @author      Maximilian Ballard
// @description get all urls on web page
// ==/UserScript==

'use strict';

function create_text_box(text) {
    const new_div = document.createElement('div');
    const new_button = document.createElement('button');
    const new_element = document.createElement('textarea');

    new_div.id = "USER-DIV-remove-this";

    new_div.style.cssText = `
        all: initial;
        position: fixed;
        top: 20%;
        left: 50%;
        transform: translate(-50%, -20%);
        z-index:100000;
        display: flex;
        flex-direction: column;
    `
    new_element.style.cssText = `
        all: initial;
        margin: 0px;
        background-color: #222222;
        width: max(80vw, 500px);
        height: max(75vh, 400px);
        padding: 20px;
        border: 10px solid black;
        color: #00FF00;
        font-family: monospace;
        font-size: 10px;
        white-space: nowrap;
        overflow: auto !important;
    `
    new_button.style.cssText = `
        all: initial;
        margin: 0px;
        background-color: black;
        color: red;
        border: none;
        font-family: Sans;
        font-size: 20px;
        padding: 5px;
        text-align: center;
        max-height: 5vh;
        overflow: hidden !important;
    `
    new_button.innerHTML = "Close";
    new_button.type = "submit";

    new_button.addEventListener("click", () => {
        const div_el = document.getElementById("USER-DIV-remove-this");
        console.log(div_el);
        div_el.remove();
    });

    new_element.value = text;

    new_div.appendChild(new_element);
    new_div.appendChild(new_button);

    return new_div
}

// MAIN
function get_urls() {
    const href_vars = document.querySelectorAll('[href]');
    const src_vars = document.querySelectorAll('[src]');
    const got_urls = new Set();

    href_vars.forEach((x) => got_urls.add(x.href));
    src_vars.forEach((x) => got_urls.add(x.src));

    const url_text = Array.from(got_urls).join("  \r\n");

    const new_text_box = create_text_box(url_text);

    document.body.appendChild(new_text_box);

}

// WAIT UNTIL BUTTON
(function() {
    const zebra = GM_registerMenuCommand("Get Urls", get_urls);
})();

