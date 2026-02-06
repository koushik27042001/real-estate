import API_BASE_URL from './api';
import { getPropertyById } from './propertyService';

const normalizeToken = (token) => {
    if (!token) return null;
    return String(token).replace(/^\s*"|"\s*$/g, '').replace(/^Bearer\s+/i, '');
};

export const getWishlist = async() => {
    const token = localStorage.getItem('token');
    const t = normalizeToken(token);
    if (t) {
        try {
            const res = await fetch(`${API_BASE_URL}/wishlist`, {
                headers: { Authorization: `Bearer ${t}` }
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                console.warn('Wishlist GET returned non-ok', res.status, data);
                // fallback to local storage for robustness
                const local = localStorage.getItem('wishlist');
                try { return local ? JSON.parse(local) : []; } catch (e) { return []; }
            }
            return data.wishlist || [];
        } catch (err) {
            console.error('Failed to fetch wishlist:', err);
            const local = localStorage.getItem('wishlist');
            try { return local ? JSON.parse(local) : []; } catch (e) { return []; }
        }
    }

    // guest: return array of propertyIds (strings)
    const local = localStorage.getItem('wishlist');
    try {
        return local ? JSON.parse(local) : [];
    } catch (e) {
        return [];
    }
};

export const addToWishlist = async(propertyId) => {
    const token = localStorage.getItem('token');
    const t = normalizeToken(token);
    if (t) {
        try {
            const res = await fetch(`${API_BASE_URL}/wishlist`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${t}` },
                body: JSON.stringify({ propertyId })
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                console.warn('Wishlist POST returned non-ok', res.status, data);
                throw new Error(data.message || 'Failed to add to wishlist');
            }
            return data.wishlist || [];
        } catch (err) {
            console.error('Wishlist add failed, falling back to localStorage:', err.message || err);
            // fallback to local storage
        }
    }

    const local = localStorage.getItem('wishlist');
    let arr = [];
    try { arr = local ? JSON.parse(local) : []; } catch (e) { arr = []; }
    if (!arr.find(id => id === propertyId)) arr.push(propertyId);
    localStorage.setItem('wishlist', JSON.stringify(arr));
    return arr;
};

export const removeFromWishlist = async(propertyId) => {
    const token = localStorage.getItem('token');
    const t = normalizeToken(token);
    if (t) {
        try {
            const res = await fetch(`${API_BASE_URL}/wishlist/${propertyId}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${t}` }
            });
            const data = await res.json().catch(() => ({}));
            if (!res.ok) {
                console.warn('Wishlist DELETE returned non-ok', res.status, data);
                throw new Error(data.message || 'Failed to remove from wishlist');
            }
            return data.wishlist || [];
        } catch (err) {
            console.error('Wishlist remove failed, falling back to localStorage:', err.message || err);
            // fallback to local storage
        }
    }

    const local = localStorage.getItem('wishlist');
    let arr = [];
    try { arr = local ? JSON.parse(local) : []; } catch (e) { arr = []; }
    arr = arr.filter(id => id !== propertyId);
    localStorage.setItem('wishlist', JSON.stringify(arr));
    return arr;
};

export const fetchPropertiesFromIds = async(ids) => {
    const results = await Promise.all(ids.map(id => getPropertyById(id).catch(() => null)));
    return results.filter(Boolean);
};

export default {
    getWishlist,
    addToWishlist,
    removeFromWishlist,
    fetchPropertiesFromIds
};