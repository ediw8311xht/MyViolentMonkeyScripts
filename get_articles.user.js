// ==UserScript==
// @name        Get Article Text
// @namespace   Violentmonkey Scripts
// @match       *://*/*
// @grant       GM_registerMenuCommand
// @version     1.0
// @author      Maximilian Ballard
// @description get article / all text on webpage
// ==/UserScript==

'use strict';

function create_text_box(text) {
    const new_div = document.createElement('div');
    const new_button = document.createElement('button');
    const new_element = document.createElement('p');

    new_div.id = "USER-DIV-remove-this";

    new_div.style.cssText = `
        all: initial;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index:100000000000000;
        display: flex;
        flex-direction: column;
    `
    new_element.style.cssText = `
        all: initial;
        margin: 0px;
        background-color: #111111;
        width: 95vw;
        height: 90vh;
        padding: 20px;
        border: 10px solid black;
        color: #DDDDDD;
        font-family: serif;
        font-size: 15px;
        overflow: auto !important;
        overflow-wrap: normal;
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

    new_element.innerText = text;

    new_div.appendChild(new_element);
    new_div.appendChild(new_button);

    return new_div
}

// MAIN
function get_article_text() {

    const body_text = document.body.innerText;

    const new_text_box = create_text_box(body_text);

    document.body.appendChild(new_text_box);

}

// WAIT UNTIL BUTTON
(function() {
    const zebra = GM_registerMenuCommand("Get Article Text", get_article_text);
})();

