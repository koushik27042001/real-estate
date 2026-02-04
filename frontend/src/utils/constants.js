export const API_BASE_URL = 'http://localhost:5000/api/v1';

export const ROLES = {
    GUEST: 'guest',
    BUYER: 'buyer',
    SELLER: 'seller',
    AGENT: 'agent',
    ADMIN: 'admin',
};

// Capabilities for each role
export const ROLE_CAPABILITIES = {
    [ROLES.GUEST]: ['browse', 'search'],
    [ROLES.BUYER]: ['browse', 'search', 'save', 'enquire', 'chat'],
    [ROLES.SELLER]: ['add_property', 'edit_property'],
    [ROLES.AGENT]: ['manage_listings', 'manage_leads'],
    [ROLES.ADMIN]: ['verify', 'approve', 'analytics'],
};

// Some backends may use synonyms like 'owner' instead of 'seller'.
// Normalize incoming role strings to our canonical roles for routing and checks.
const ROLE_SYNONYMS = {
    owner: ROLES.SELLER,
    landlord: ROLES.SELLER,
    purchaser: ROLES.BUYER,
};

export const getRouteRole = (role) => {
    if (!role) return ROLES.GUEST;
    const r = String(role).toLowerCase();
    return ROLE_SYNONYMS[r] || r;
};

export default API_BASE_URL;