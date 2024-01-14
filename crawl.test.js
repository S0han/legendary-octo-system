const { test, expect } = require('@jest/globals');
const { normalizeURL, getURLsFromHTML } = require('./crawl.js');


describe('NormalizeURL() tests', () => {
    
    test('turn https://blog.boot.dev/path/ to normalized blog.boot.dev/path', () => {
        expect(normalizeURL('https://blog.boot.dev/path/')).toEqual('blog.boot.dev/path');
    });

    test('turn https://blog.boot.dev/path to normalized blog.boot.dev/path', () => {
        expect(normalizeURL('https://blog.boot.dev/path')).toEqual('blog.boot.dev/path');
    });

    test('turn http://blog.boot.dev/path/ to normalized blog.boot.dev/path', () => {
        expect(normalizeURL('http://blog.boot.dev/path/')).toEqual('blog.boot.dev/path');
    });

    test('turn http://blog.boot.dev/path to normalized blog.boot.dev/path', () => {
        expect(normalizeURL('http://blog.boot.dev/path')).toEqual('blog.boot.dev/path');
    });

});

describe('getURLsFromHTML() tests', () => {

    test('return array with url', () => {
        const inputURL = 'https://blog.boot.dev';
        const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a></body></html>';
        const actual = getURLsFromHTML(inputBody, inputURL);
        const expected = ['https://blog.boot.dev'];
        expect(actual).toEqual(expected);
    });

    test('return array with multiple urls', () => {
        const inputURL = 'https://blog.boot.dev';
        const inputBody = `
                    <html><body>
                        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
                        <a href="https://blog.boot.dev/one"><span>Go to Boot.dev</span></a>
                        <a href="https://blog.boot.dev/two"><span>Go to Boot.dev</span></a>
                    </body></html>
                `;
        const actual = getURLsFromHTML(inputBody, inputURL);
        const expected = ['https://blog.boot.dev', 'https://blog.boot.dev/one', 'https://blog.boot.dev/two'];
        expect(actual).toEqual(expected);
    });

    test('return array with absolute url', () => {
        const inputURL = 'https://blog.boot.dev';
        const inputBody = '<html><body><a href="/one"><span>Go to Boot.dev</span></a></body></html>';
        const actual = getURLsFromHTML(inputBody, inputURL);
        const expected = ['https://blog.boot.dev/one'];
        expect(actual).toEqual(expected);
    });

});
