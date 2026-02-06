import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import wishlistService from '../../services/wishlistService';
import { useAuth } from '../../contexts/AuthContext';

export default function PropertyCard({ property }) {
  const [inWishlist, setInWishlist] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    const check = async () => {
      const list = await wishlistService.getWishlist();
      // list may be array of ids (strings) or objects with _id
      const found = list.some(item => (typeof item === 'string' ? item === property._id : (item._id === property._id)));
      if (mounted) setInWishlist(found);
    };
    check();
    return () => { mounted = false; };
  }, [property._id]);

  const toggleWishlist = async () => {
    try {
      if (inWishlist) {
        const updated = await wishlistService.removeFromWishlist(property._id);
        // updated may be array of objects or ids
        const found = updated.some(item => (typeof item === 'string' ? item === property._id : item._id === property._id));
        setInWishlist(found);
      } else {
        const updated = await wishlistService.addToWishlist(property._id);
        const found = updated.some(item => (typeof item === 'string' ? item === property._id : item._id === property._id));
        setInWishlist(found);
      }
    } catch (err) {
      console.error('Wishlist error:', err);
      alert(err.message || 'Could not update wishlist');
    }
  };

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

      <div className="mt-2 flex items-center justify-between">
        <Link
          to={`/property/${property._id}`}
          className="text-blue-600 underline"
        >
          View Details
        </Link>
        {(!user || user.role === 'buyer') && (
          <button onClick={toggleWishlist} className={`ml-4 px-3 py-1 rounded ${inWishlist ? 'bg-red-500 text-white' : 'bg-gray-200'}`}>
            {inWishlist ? 'Remove' : 'Wishlist'}
          </button>
        )}
      </div>
    </div>
  );
}
