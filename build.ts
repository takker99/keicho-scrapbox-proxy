const output = await Deno.emit("./index.ts", { bundle: "module" });
const code = output.files["deno:///bundle.js"];

await Deno.writeTextFile(
  "index.js",
  `// ==UserScript==
// @name         keicho-proxy
// @namespace    https://scrapbox.io
// @version      0.1.0
// @description  talk to Keicho
// @author       takker
// @match        https://scrapbox.io/*
// @connect      keicho.herokuapp.com
// @grant        GM_xmlhttpRequest
// @license      MIT
// @copyright    Copyright (c) 2021 takker
// ==/UserScript==
${code}`,
);
