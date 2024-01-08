function normalizeURL(url) {
    if (url.startsWith('https://')) {
        url = url.replace('https://', '');
    }
    else if (url.startsWith('http://')) {
        url = url.replace('http://', '');
    }
    
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    
    return url;
}

module.exports = {
    normalizeURL
}