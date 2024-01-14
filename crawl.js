const url = require('node:url');
const { JSDOM } = require('jsdom');


function normalizeURL(url) {
    const myURL = new URL(url);
    const urlOrigin = myURL.host;
    let urlPath = myURL.pathname;

    if (urlPath.endsWith('/')) {
        urlPath = urlPath.slice(0, -1);
    }
    
    const normalized = urlOrigin + urlPath;

    return normalized;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const a_list = dom.window.document.querySelectorAll('a');
    const links = [];
    for (let i = 0; i < a_list.length; i++) {
        links.push(a_list[i].getAttribute('href'));
    }
    return links
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}