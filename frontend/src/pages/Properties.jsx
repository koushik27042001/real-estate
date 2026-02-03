import PropertyList from "../components/property/PropertyList";

const dummyData = [
  { id: 1, title: "2 BHK Apartment", location: "Bangalore", price: "75 Lakh" },
  { id: 2, title: "3 BHK Villa", location: "Hyderabad", price: "1.2 Cr" },
  { id: 3, title: "1 BHK Flat", location: "Pune", price: "45 Lakh" },
];

export default function Properties() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">All Properties</h1>
      <PropertyList properties={dummyData} />
    </>
  );
}
