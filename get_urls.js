
// ==UserScript==
// @name        geturls
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       GM_registerMenuCommand
// @version     1.0
// @author      Maximilian Ballard
// @description get all urls on web page
// ==/UserScript==

function jammy() {
    'use strict';
    const href_vars = document.querySelectorAll('[href]');
    const src_vars = document.querySelectorAll('[src]');

    const new_div = document.createElement('div');

    new_div.id = "USER-DIV-remove-this";

    new_div.style.cssText = `
        all: initial;
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index:100000;
        display: flex;
        flex-direction: column;
    `

    const new_button = document.createElement('button');

    new_button.addEventListener("click", () => {
        const div_el = document.getElementById("USER-DIV-remove-this");
        console.log(div_el);
        div_el.remove();
    });

    new_button.innerHTML = "Close";
    new_button.type = "submit";
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
    `

    const new_element = document.createElement('textarea');

    //START CSS
    new_element.style.cssText = `
        all: initial;
        margin: 0px;
        background-color: #222222;
        width: max(80vw, 500px);
        height: 40vh;
        padding: 20px;
        border: 10px solid black;
        color: #00FF00;
        font-family: monospace;
        font-size: 10px;
        overflow: auto !important;
    `
    //END CSS
    const got_urls = new Set();
    href_vars.forEach((x) => got_urls.add(x.href));
    src_vars.forEach((x) => got_urls.add(x.src));
    new_element.value = Array.from(got_urls).join("\r\n");


    new_div.appendChild(new_element);
    new_div.appendChild(new_button);
    document.body.appendChild(new_div);

    console.log("HI");
}

(function() {
    'use strict';
    const zebra = GM_registerMenuCommand("Get Urls", jammy);

})();

