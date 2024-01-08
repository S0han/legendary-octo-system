const { test, expect } = require('@jest/globals');
const { normalizeURL } = require('./crawl.js');

test('turn https://blog.boot.dev/path/ to normalized blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
})

test('turn https://blog.boot.dev/path to normalized blog.boot.dev/path', () => {
    expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path');
})