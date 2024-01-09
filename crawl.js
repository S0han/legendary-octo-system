const url = require('node:url');

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

module.exports = {
    normalizeURL
}