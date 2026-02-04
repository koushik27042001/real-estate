import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  return (
    <div className="border rounded p-4">
      {property.images && property.images.length > 0 ? (
        <img
          src={`http://localhost:5000/${property.images[0]}`}
          alt={property.title}
          className="mb-3 w-full h-48 object-cover"
        />
      ) : (
        <img
          src="https://via.placeholder.com/300"
          alt=""
          className="mb-3 w-full h-48 object-cover"
        />
      )}
      <h3 className="font-semibold">{property.title}</h3>
      <p>{property.location}</p>
      <p className="font-bold text-blue-600">${property.price}</p>
      <p>{property.bedrooms} bed, {property.bathrooms} bath</p>
      <p>{property.area} sq ft</p>

      <Link
        to={`/property/${property._id}`}
        className="text-blue-600 underline mt-2 block"
      >
        View Details
      </Link>
    </div>
  );
}
