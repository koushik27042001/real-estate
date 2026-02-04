import React, { useState } from 'react';
import { addProperty } from '../../services/propertyService';

const AddProperty = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        type: 'sale',
        bedrooms: '',
        bathrooms: '',
        area: '',
        images: []
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // The '0' was removed from here

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, images: Array.from(e.target.files) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('Please login first');
            setLoading(false);
            return;
        }

        try {
            const result = await addProperty(formData, token);
            if (result.message) {
                setMessage(result.message);
            } else {
                setMessage('Property added successfully!');
                setFormData({
                    title: '',
                    description: '',
                    price: '',
                    location: '',
                    type: 'sale',
                    bedrooms: '',
                    bathrooms: '',
                    area: '',
                    images: []
                });
            }
        } catch (error) {
            setMessage('Error adding property');
        }
        setLoading(false);
    };

    return (
        <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-bold">Add New Property</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="sale">For Sale</option>
                        <option value="rent">For Rent</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Bedrooms</label>
                    <input
                        type="number"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Bathrooms</label>
                    <input
                        type="number"
                        name="bathrooms"
                        value={formData.bathrooms}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Area (sq ft)</label>
                    <input
                        type="number"
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Images</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border rounded"
                        accept="image/*"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Property'}
                </button>
            </form>
            {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        </div>
    );
};

export default AddProperty;