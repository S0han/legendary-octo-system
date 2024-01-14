const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');


describe('NormalizeURL() tests', () => {
    
    test('turn https://blog.boot.dev/path/ to normalized blog.boot.dev/path', () => {
        expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    });

    test('turn https://blog.boot.dev/path to normalized blog.boot.dev/path', () => {
        expect(normalizeURL('https://blog.boot.dev/path')).toBe('blog.boot.dev/path');
    });

    test('turn http://blog.boot.dev/path/ to normalized blog.boot.dev/path', () => {
        expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
    });

    test('turn http://blog.boot.dev/path to normalized blog.boot.dev/path', () => {
        expect(normalizeURL('http://blog.boot.dev/path')).toBe('blog.boot.dev/path');
    });

});

describe('getURLsFromHTML() tests', () => {

    test('return array with url', () => {
        expect(getURLsFromHTML(`
        <html>
            <body>
                <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
            </body>
        </html>`, 
        'https://blog.boot.dev'
        )).toEqual([`<a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>`]);
    });

});
