import PropertyCard from "./PropertyCard";

export default function PropertyList({ properties }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
