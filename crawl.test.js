const { test, expect } = require('@jest/globals');
const { normalizeURL } = require('./crawl.js');

test('turn https://blog.boot.dev/path/ to normalized blog.booth.dev/path', () => {
    expect(url).toBe('blog.booth.dev/path')
})