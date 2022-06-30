"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const page_js_1 = require("./components/page.js");
class App {
    constructor(appRoot) {
        this.page = new page_js_1.PageComponent();
        this.page.attachTo(appRoot);
    }
}
new App(document.querySelector(".document"));
