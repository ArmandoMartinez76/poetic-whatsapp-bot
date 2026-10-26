/**
 * Sanitizes and formats a phone number for WhatsApp Web.
 * Strips all non-digit characters and ensures minimum required length.
 * 
 * @param {string|number} number
 * @returns {{ valid: boolean, formatted?: string, digits?: string, error?: string }}
 */
function sanitizePhoneNumber(number) {
    if (number === undefined || number === null || number === '') {
        return { valid: false, error: 'Number is required.' };
    }
    const cleaned = String(number).trim().replace(/\D/g, '');
    if (!cleaned || cleaned.length < 8) {
        return { valid: false, error: 'Invalid phone number format.' };
    }
    return { valid: true, formatted: `${cleaned}@c.us`, digits: cleaned };
}

/**
 * Creates an authentication middleware for Express routes.
 * If apiKey is null or empty, access is unrestricted.
 * 
 * @param {string|null} apiKey
 * @returns {import('express').RequestHandler}
 */
function createAuthMiddleware(apiKey) {
    return (req, res, next) => {
        if (!apiKey) {
            return next();
        }
        const clientKey = req.headers['x-api-key'] || (req.query && req.query.apiKey);
        if (clientKey !== apiKey) {
            return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key.' });
        }
        next();
    };
}

module.exports = {
    sanitizePhoneNumber,
    createAuthMiddleware
};
