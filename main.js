const { argv } = require('node:process');
const { crawlPage } = require('./crawl')
const { printReport } = require('./report');

async function main() {
   
    if (process.argv.length < 3) {
        console.error('Expected at least 1 CLI argument');
        return
    } else if (process.argv.length > 3) {
        console.error('More than 1 CLI argument');
        return
    }
    
    const BASE_URL = process.argv[2]
    console.log(`The crawler is starting at ${BASE_URL}`)

    const pages = crawlPage(BASE_URL, BASE_URL, {});
    printReport(pages);
}

main()