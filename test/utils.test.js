const test = require('node:test');
const assert = require('node:assert/strict');
const { sanitizePhoneNumber, createAuthMiddleware } = require('../utils');

test('sanitizePhoneNumber - validates and formats valid phone numbers', () => {
    // Normal international format with + and spaces
    const res1 = sanitizePhoneNumber('+52 1 733 343 2538');
    assert.equal(res1.valid, true);
    assert.equal(res1.formatted, '5217333432538@c.us');
    assert.equal(res1.digits, '5217333432538');

    // Number with dashes and parentheses
    const res2 = sanitizePhoneNumber('(521) 55-1424-6062');
    assert.equal(res2.valid, true);
    assert.equal(res2.formatted, '5215514246062@c.us');

    // Pure number type
    const res3 = sanitizePhoneNumber(5217333432538);
    assert.equal(res3.valid, true);
    assert.equal(res3.formatted, '5217333432538@c.us');
});

test('sanitizePhoneNumber - rejects invalid or empty phone numbers', () => {
    assert.equal(sanitizePhoneNumber('').valid, false);
    assert.equal(sanitizePhoneNumber(null).valid, false);
    assert.equal(sanitizePhoneNumber(undefined).valid, false);
    // Too short (less than 8 digits)
    assert.equal(sanitizePhoneNumber('12345').valid, false);
    // Non-digits only
    assert.equal(sanitizePhoneNumber('abc-xyz').valid, false);
});

test('createAuthMiddleware - allows requests when no apiKey is set', () => {
    const middleware = createAuthMiddleware(null);
    let nextCalled = false;
    const req = { headers: {} };
    const res = {};

    middleware(req, res, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, true);
});

test('createAuthMiddleware - blocks requests when apiKey is wrong or missing', () => {
    const middleware = createAuthMiddleware('secret-token-123');
    let statusCode = null;
    let jsonBody = null;
    let nextCalled = false;

    const reqMissing = { headers: {} };
    const resMissing = {
        status(code) {
            statusCode = code;
            return this;
        },
        json(data) {
            jsonBody = data;
        }
    };

    middleware(reqMissing, resMissing, () => { nextCalled = true; });
    assert.equal(nextCalled, false);
    assert.equal(statusCode, 401);
    assert.match(jsonBody.error, /Unauthorized/);

    // With wrong key
    const reqWrong = { headers: { 'x-api-key': 'wrong-key' } };
    middleware(reqWrong, resMissing, () => { nextCalled = true; });
    assert.equal(nextCalled, false);
    assert.equal(statusCode, 401);
});

test('createAuthMiddleware - allows requests when x-api-key header matches', () => {
    const middleware = createAuthMiddleware('secret-token-123');
    let nextCalled = false;
    const reqValid = { headers: { 'x-api-key': 'secret-token-123' } };
    const res = {};

    middleware(reqValid, res, () => {
        nextCalled = true;
    });

    assert.equal(nextCalled, true);
});
