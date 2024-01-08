function normalizeURL(url) {
    if (url.startsWith('https://')) {
        url = url.replace('https://', '');
    }
    
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    
    return url;
}

module.exports = {
    normalizeURL
}