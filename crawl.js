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
        if (a_list[i].getAttribute('href').includes(baseURL)) {
            links.push(a_list[i].getAttribute('href'));
        } else {
            const absolute = new URL(`${a_list[i].getAttribute('href')}`, baseURL).href;
            links.push(absolute);
        }
    }
    return links
}

//original crawlPage fcn before recursion addition
/* 
async function crawlPage(URL) {
    try {
        const response = await fetch(URL);

        if (response.ok) {
            const text = await response.text();
            // const dom = new JSDOM(text, {contentType: 'text/html' });
            // const htmlBody = dom.window.document.querySelector('body').innerHTML;
            // console.log(`${htmlBody}`);
            console.log(`${text}`); // matches design intent to display raw HTML <html> ... </html>
        } else {
            if (response.status >= 400) {
                throw new Error('400+ Error');
                return
            }
            if (response.headers.get('content-type') != 'text/html') {
                throw new Error('Data is not text/html')
            }
        }

    } catch (e) {
        console.error('Fetch', e);
    }
}
*/

async function crawlPage(baseURL, currentURL, pages) {
    try {
        const response = await fetch(URL);

        if (response.ok) {
            const text = await response.text();
            console.log(`${text}`);
        } else {
            if (response.status >= 400) {
                throw new Error('400+ Error');
                return
            }
            if (response.headers.get('content-type') != 'text/html') {
                throw new Error('Data is not text/html')
            }
        }

    } catch (e) {
        console.error('Fetch', e);
    }
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
}