import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  return (
    <div className="border rounded p-4">
      <img
        src="https://via.placeholder.com/300"
        alt=""
        className="mb-3"
      />
      <h3 className="font-semibold">{property.title}</h3>
      <p>{property.location}</p>
      <p className="font-bold text-blue-600">₹ {property.price}</p>

      <Link
        to={`/property/${property.id}`}
        className="text-blue-600 underline mt-2 block"
      >
        View Details
      </Link>
    </div>
  );
}
