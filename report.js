
function printReport(pages) {
    console.log('The report is starting!');
    const sortedPages = sortPages(pages);
    for (let i = 0; i < sortedPages.length; i++) {
        const url = sortedPages[i][0];
        const count = sortedPages[i][1];
        console.log(`Found ${count} internal links to ${url}`);
    }
}

function sortPages(pages) {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => a[1] - b[1]);
    return pagesArr
}

module.exports = {
    printReport,
    sortPages
}