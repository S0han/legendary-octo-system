const url = require('node:url');
const { JSDOM } = require('jsdom');


function normalizeURL(url) {
    const myURL = new URL(url);
    let urlOrigin = `${myURL.host}${myURL.pathname}`

    if (urlOrigin.length > 0 && urlOrigin.slice(-1) == '/') {
        urlOrigin = urlOrigin.slice(0, -1);
    }

    return urlOrigin;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const dom = new JSDOM(htmlBody);
    const a_list = dom.window.document.querySelectorAll('a');
    const links = [];
    for (let i = 0; i < a_list.length; i++) {
        if (a_list[i].getAttribute('href').includes(baseURL)) {
            links.push(a_list[i].getAttribute('href'));
        } else {
            const absolute = new URL(`${a_list[i].getAttribute('href')}`, baseURL).href;
            links.push(absolute);
        }
    }
    return links
}

async function crawlPage(baseURL, currentURL, pages = {}) {
    const current = new URL(currentURL);
    const base = new URL(baseURL)

    if (current.hostname !== base.hostname) {
        return pages
    }   
   
    const currentNormalized = normalizeURL(currentURL);

    if (pages[`${currentNormalized}`] > 0) {
        pages[`${currentNormalized}`]++;
        return pages
    }
    pages[`${currentNormalized}`] = 1;
  
    console.log(`crawling ${currentURL}`);

    try {
        const response = await fetch(currentURL);
        if (response.status >= 400) {
            throw new Error('400+ Error');
        }
        
        const contentType = response.headers.get('content-type');
        if ( !contentType.includes('text/html')) {
            throw new Error(`${contentType} is not text/html`);
        }
        
        const htmlBody = await response.text();
        const allURLs = getURLsFromHTML(htmlBody, baseURL);
        
        for (let i = 0; i < allURLs.length; i++) {
            crawlPage(baseURL, allURLs[i], pages);
        }
        
        return pages
    } catch (e) {
        console.error(e.message);
        return pages
    } 
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
}