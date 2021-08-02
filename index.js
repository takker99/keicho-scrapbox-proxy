// ==UserScript==
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
unsafeWindow.askKeicho = async (text, { id } = {}) => {
  if (!id) {
    id = await new Promise((resolve, reject) =>
      GM_xmlhttpRequest({
        method: "GET",
        url: "https://keicho.herokuapp.com/api/web/create/?mode=normal",
        onload: ({ responseText }) => resolve(responseText),
        onerror: (e) => reject(e),
      })
    );
  }
  return await new Promise((resolve, reject) =>
    GM_xmlhttpRequest({
      method: "POST",
      url: "https://keicho.herokuapp.com/api/web/",
      data: JSON.stringify({
        talk: id,
        text,
        user: "nobody",
      }),
      headers: {
        "Content-Type": "application/json",
      },
      onload: ({ response }) =>
        resolve({
          id,
          ...response,
        }),
      responseType: "json",
      onerror: (e) => reject(e),
    })
  );
};
