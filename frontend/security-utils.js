// Security utility functions for XSS prevention
function sanitizeText(text) {
    if (text == null) return '';
    return String(text).replace(/[<>&"']/g, function(match) {
        switch (match) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '"': return '&quot;';
            case "'": return '&#x27;';
            default: return match;
        }
    });
}

function sanitizeUrl(url) {
    if (!url) return '';
    // Basic URL validation - only allow http/https
    if (url.match(/^https?:\/\//)) {
        return url;
    }
    return ''; // Return empty if invalid
}

// Safe DOM creation functions
function createTextElement(tag, text, className = '') {
    const element = document.createElement(tag);
    element.textContent = text || '';
    if (className) element.className = className;
    return element;
}

function createImageElement(src, alt, fallbackSrc) {
    const img = document.createElement('img');
    img.src = sanitizeUrl(src) || fallbackSrc;
    img.alt = sanitizeText(alt);
    img.onerror = function() {
        this.onerror = null;
        this.src = fallbackSrc;
    };
    return img;
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        sanitizeText,
        sanitizeUrl,
        createTextElement,
        createImageElement
    };
}