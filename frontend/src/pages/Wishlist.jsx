import { useEffect, useState } from 'react';
import wishlistService, { fetchPropertiesFromIds } from '../services/wishlistService';
import PropertyCard from '../components/property/PropertyCard';
import { useAuth } from '../contexts/AuthContext';

export default function Wishlist() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      const list = await wishlistService.getWishlist();
      // if list contains strings -> ids, fetch the properties
      const isIds = list.length > 0 && typeof list[0] === 'string';
      let props = list;
      if (isIds) {
        props = await fetchPropertiesFromIds(list);
      }
      if (mounted) setItems(props);
      setLoading(false);
    };
    load();
    return () => { mounted = false; };
  }, []);

  if (loading) return <div className="p-4">Loading wishlist...</div>;

  if (user && user.role !== 'buyer') return <div className="p-4">Wishlist is available to buyers only.</div>;

  if (!items || items.length === 0) return <div className="p-4">Your wishlist is empty.</div>;

  return (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
      {items.map(p => (
        <PropertyCard key={p._id || p} property={p} />
      ))}
    </div>
  );
}
