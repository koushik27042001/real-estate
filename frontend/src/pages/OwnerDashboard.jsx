import React, { useState, useEffect } from 'react';
import AddProperty from '../components/property/AddProperty';
import { getPropertiesByOwner } from '../services/propertyService';

const OwnerDashboard = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                const result = await getPropertiesByOwner(user.id);
                setProperties(result);
            }
            setLoading(false);
        };
        fetchProperties();
    }, []);

    return (
        <div className="p-4">
            <h1 className="mb-4 text-2xl font-bold">Owner Dashboard</h1>
            <p>Welcome, Owner! Manage your properties, view listings, and track inquiries.</p>

            <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold">Add New Property</h2>
                <AddProperty />
            </div>

            <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold">Your Properties</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : properties.length === 0 ? (
                    <p>No properties added yet.</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {properties.map(property => (
                            <div key={property._id} className="p-4 bg-white rounded-lg shadow-md">
                                <h3 className="text-lg font-bold">{property.title}</h3>
                                <p className="text-sm text-gray-600">{property.location}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="font-bold text-blue-600">${property.price}</p>
                                    <p className="text-xs px-2 py-1 bg-gray-100 rounded">{property.type}</p>
                                </div>
                                {property.images && property.images.length > 0 && (
                                    <img src={`http://localhost:5000/${property.images[0]}`} alt={property.title} className="object-cover w-full h-32 mt-2" />
                                )}

                                <div className="mt-3">
                                    <p className="text-sm text-gray-700">Visitors: <strong>{property.visitorCount || 0}</strong></p>
                                    <p className="text-sm text-gray-700">Inquiries: <strong>{(property.inquiries && property.inquiries.length) || 0}</strong></p>
                                </div>

                                {property.inquiries && property.inquiries.length > 0 && (
                                    <div className="mt-3 border-t pt-3">
                                        <h4 className="font-semibold">Inquiries</h4>
                                        <ul className="space-y-2 mt-2">
                                            {property.inquiries.map((inq, idx) => (
                                                <li key={idx} className="p-2 bg-gray-50 rounded">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="font-medium">{inq.name || 'Anonymous'}</p>
                                                            <p className="text-sm text-gray-600">{inq.message}</p>
                                                            {inq.email && (
                                                                <p className="text-sm mt-1">Contact: <a href={`mailto:${inq.email}`} className="text-blue-600 underline">{inq.email}</a></p>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-gray-500">
                                                            {new Date(inq.createdAt).toLocaleString()}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OwnerDashboard;