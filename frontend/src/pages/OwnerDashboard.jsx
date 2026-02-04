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
                                <p>{property.location}</p>
                                <p>${property.price}</p>
                                <p>{property.type}</p>
                                {property.images && property.images.length > 0 && (
                                    <img src={`http://localhost:5000/${property.images[0]}`} alt={property.title} className="object-cover w-full h-32 mt-2" />
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