import React, { useState, useEffect } from 'react';
import PropertyList from "../components/property/PropertyList";
import { getProperties } from '../services/propertyService';

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      const result = await getProperties();
      setProperties(result);
      setLoading(false);
    };
    fetchProperties();
  }, []);

  if (loading) {
    return <p>Loading properties...</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">All Properties</h1>
      <PropertyList properties={properties} />
    </>
  );
}
