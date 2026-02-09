import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Button from "../components/common/Button";
import { getPropertyById } from '../services/propertyService';
import { inquireProperty } from '../services/propertyService';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const result = await getPropertyById(id);
        if (result && result.error) {
          setError(result.error);
          setProperty(null);
        } else {
          setProperty(result);
        }
      } catch (err) {
        setError("Failed to load property details.");
        setProperty(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) {
    return <p>Loading property details...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
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
      <p>Owner: {property.owner?.name || "Not available"}</p>

      <ContactForm propertyId={id} />
    </div>
  );
}

function ContactForm({ propertyId }) {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await inquireProperty(propertyId, { name, email, message });
      setStatus('sent');
      setName(''); setEmail(''); setMessage('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 p-4 border rounded">
      <h3 className="font-semibold mb-2">Contact Owner</h3>
      <input className="block w-full mb-2 p-2 border rounded" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} required />
      <input className="block w-full mb-2 p-2 border rounded" placeholder="Your email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <textarea className="block w-full mb-2 p-2 border rounded" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} required />
      <button className="px-3 py-1 bg-blue-600 text-white rounded" type="submit">Send</button>
      {status === 'sending' && <p className="text-sm text-gray-600 mt-2">Sending...</p>}
      {status === 'sent' && <p className="text-sm text-green-600 mt-2">Message sent to owner.</p>}
      {status === 'error' && <p className="text-sm text-red-600 mt-2">Failed to send. Try again later.</p>}
    </form>
  );
}
