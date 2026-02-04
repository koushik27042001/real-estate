import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Button from "../components/common/Button";
import { getPropertyById } from '../services/propertyService';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      const result = await getPropertyById(id);
      setProperty(result);
      setLoading(false);
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return <p>Loading property details...</p>;
  }

  if (!property) {
    return <p>Property not found.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      {property.images && property.images.length > 0 ? (
        <div className="mb-4">
          {property.images.map((image, index) => (
            <img key={index} src={`http://localhost:5000/${image}`} alt={property.title} className="w-full h-64 object-cover mb-2" />
          ))}
        </div>
      ) : (
        <img src="https://via.placeholder.com/600" alt="" className="mb-4 w-full h-64 object-cover" />
      )}
      <h1 className="text-3xl font-bold">{property.title}</h1>
      <p className="my-4">{property.description}</p>
      <p className="font-bold text-xl text-blue-600">${property.price}</p>
      <p>Location: {property.location}</p>
      <p>Type: {property.type}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Area: {property.area} sq ft</p>
      <p>Owner: {property.owner.name}</p>

      <Button className="mt-4">Contact Owner</Button>
    </div>
  );
}
