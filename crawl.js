const url = require('node:url');
const { JSDOM } = require('jsdom');


function normalizeURL(url) {
    const myURL = new URL(url);
    let urlOrigin = `${myURL.host}${myURL.pathname}`;

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
                throw new Error('Data is not text/html');
            }
        }

    } catch (e) {
        console.error('Fetch', e);
    }
}
*/

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
        
        
    console.log(`crawling ${currentURL}`)
    let htmlBody = ''
        
    try {
        const response = await fetch(currentURL);
        if (response.status >= 400) {
            throw new Error('400+ Error');
            return pages
        }
        const contentType = response.headers.get('content-type');
        if (!contentType.includes('text/html')) {
            console.log(`${contentType} is not text/html`);
            return pages
        }
        text = await response.text();
    } catch (err) {
        console.log(err.message);
    }
    
    const allURLs = getURLsFromHTML(text, baseURL);
    for (const url of allURLs) {
        pages = await crawlPage(baseURL, url, pages);
    }
    return pages
  
        
} 

            
                
    


module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage,
}