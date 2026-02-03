import API_BASE_URL from './api';

export const getProperties = async() => {
    const response = await fetch(`${API_BASE_URL}/properties`);
    return response.json();
};