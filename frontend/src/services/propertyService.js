import API_BASE_URL from './api';

export const getProperties = async() => {
    const response = await fetch(`${API_BASE_URL}/properties`);
    return response.json();
};

export const getPropertyById = async(id) => {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`);
    return response.json();
};

const normalizeToken = (token) => {
    if (!token) return null;
    // remove any surrounding quotes and any leading "Bearer " prefix
    return String(token).replace(/^\s*"|"\s*$/g, '').replace(/^Bearer\s+/i, '');
};

export const addProperty = async(propertyData, token) => {
    const formData = new FormData();
    formData.append('title', propertyData.title);
    formData.append('description', propertyData.description);
    formData.append('price', propertyData.price);
    formData.append('location', propertyData.location);
    formData.append('type', propertyData.type);
    formData.append('bedrooms', propertyData.bedrooms);
    formData.append('bathrooms', propertyData.bathrooms);
    formData.append('area', propertyData.area);

    if (propertyData.images) {
        for (let i = 0; i < propertyData.images.length; i++) {
            formData.append('images', propertyData.images[i]);
        }
    }

    const t = normalizeToken(token);
    const response = await fetch(`${API_BASE_URL}/properties`, {
        method: 'POST',
        headers: t ? { 'Authorization': `Bearer ${t}` } : {},
        body: formData
    });
    return response.json();
};

export const updateProperty = async(id, propertyData, token) => {
    const formData = new FormData();
    if (propertyData.title) formData.append('title', propertyData.title);
    if (propertyData.description) formData.append('description', propertyData.description);
    if (propertyData.price) formData.append('price', propertyData.price);
    if (propertyData.location) formData.append('location', propertyData.location);
    if (propertyData.type) formData.append('type', propertyData.type);
    if (propertyData.bedrooms) formData.append('bedrooms', propertyData.bedrooms);
    if (propertyData.bathrooms) formData.append('bathrooms', propertyData.bathrooms);
    if (propertyData.area) formData.append('area', propertyData.area);

    if (propertyData.images) {
        for (let i = 0; i < propertyData.images.length; i++) {
            formData.append('images', propertyData.images[i]);
        }
    }

    const t = normalizeToken(token);
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'PUT',
        headers: t ? { 'Authorization': `Bearer ${t}` } : {},
        body: formData
    });
    return response.json();
};

export const deleteProperty = async(id, token) => {
    const t = normalizeToken(token);
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
        method: 'DELETE',
        headers: t ? { 'Authorization': `Bearer ${t}` } : {}
    });
    return response.json();
};

export const getPropertiesByOwner = async(ownerId) => {
    const response = await fetch(`${API_BASE_URL}/properties/owner/${ownerId}`);
    return response.json();
};

export const inquireProperty = async(propertyId, data) => {
    const response = await fetch(`${API_BASE_URL}/properties/${propertyId}/inquire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return response.json();
};