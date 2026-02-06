import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [ptype, setPtype] = useState("");
  const [budget, setBudget] = useState("");

  const featured = [
    {
      id: 1,
      title: "Luxury Apartment",
      location: "Bangalore, India",
      price: "₹85 Lakhs",
      img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    },
    {
      id: 2,
      title: "Modern Villa",
      location: "Goa, India",
      price: "₹2.1 Cr",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    },
    {
      id: 3,
      title: "Cozy Studio",
      location: "Mumbai, India",
      price: "₹45 Lakhs",
      img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    },
  ];

  function onSearch(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (ptype) params.set("type", ptype);
    if (budget) params.set("budget", budget);
    navigate(`/properties?${params.toString()}`);
  }

  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-screen items-center justify-center bg-[url('https://images.unsplash.com/photo-1568605114967-8130f3a36994')] bg-cover bg-center pt-20">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full max-w-4xl px-6 text-center text-white">
          <h2 className="text-4xl font-bold md:text-5xl">Find Your Dream Home</h2>

          <p className="mt-4 text-lg text-gray-200">
            A modern marketplace connecting buyers, renters, owners and agents — browse verified
            listings, compare prices and connect directly with sellers.
          </p>

          {/* Search Box (functional) */}
          <form onSubmit={onSearch} className="mt-8 grid gap-4 rounded-xl bg-white p-4 md:grid-cols-4">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="rounded border p-3 text-gray-800"
              placeholder="Enter city or locality"
              aria-label="City or locality"
            />

            <select
              value={ptype}
              onChange={(e) => setPtype(e.target.value)}
              className="rounded border p-3 text-gray-800"
              aria-label="Property type"
            >
              <option value="">Property Type</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="plot">Plot</option>
              <option value="studio">Studio</option>
            </select>

            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="rounded border p-3 text-gray-800"
              aria-label="Budget"
            >
              <option value="">Budget</option>
              <option value="0-50">₹0 - ₹50L</option>
              <option value="50-100">₹50L - ₹1Cr</option>
              <option value="100+">₹1Cr+</option>
            </select>

            <button
              type="submit"
              className="flex items-center justify-center rounded bg-blue-600 font-semibold text-white hover:bg-blue-700"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* ================= FEATURED PROPERTIES ================= */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h3 className="mb-8 text-3xl font-bold text-gray-800">Featured Properties</h3>
          <Link to="/properties" className="text-sm font-medium text-blue-600 hover:underline">
            Explore all properties →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((p) => (
            <article key={p.id} className="overflow-hidden rounded-xl bg-white shadow hover:shadow-lg transition">
              <Link to={`/property/${p.id}`} className="block">
                <img src={p.img} className="h-48 w-full object-cover" alt={p.title} />

                <div className="p-5">
                  <h4 className="text-lg font-semibold">{p.title}</h4>
                  <p className="text-sm text-gray-500">{p.location}</p>
                  <p className="mt-2 font-bold text-blue-600">{p.price}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="mb-10 text-center text-3xl font-bold text-gray-800">Why Choose Our Platform?</h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <h4 className="text-xl font-semibold">Verified Listings</h4>
              <p className="mt-2 text-gray-600">All listings are verified by our team.</p>
            </div>

            <div className="text-center">
              <h4 className="text-xl font-semibold">Transparent Pricing</h4>
              <p className="mt-2 text-gray-600">Clear fees and no hidden charges.</p>
            </div>

            <div className="text-center">
              <h4 className="text-xl font-semibold">Trusted Agents</h4>
              <p className="mt-2 text-gray-600">Work with certified local agents.</p>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-6 md:flex-row">
            <div className="flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">25k+</div>
                <div className="text-sm text-gray-500">Listings</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">50k+</div>
                <div className="text-sm text-gray-500">Happy Customers</div>
              </div>

              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">4.8/5</div>
                <div className="text-sm text-gray-500">Average Rating</div>
              </div>
            </div>

            <div className="mt-4 md:mt-0">
              <div className="flex items-center gap-3">
                <img
                  src="https://placehold.co/140x48?text=Partner+1"
                  alt="partner 1"
                  className="h-8 w-auto opacity-80"
                />
                <img
                  src="https://placehold.co/140x48?text=Partner+2"
                  alt="partner 2"
                  className="h-8 w-auto opacity-80"
                />
                <img
                  src="https://placehold.co/140x48?text=Partner+3"
                  alt="partner 3"
                  className="h-8 w-auto opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-blue-600 py-16 text-center text-white">
        <h3 className="text-3xl font-bold">Ready to Sell or Rent Your Property?</h3>

        <p className="mt-3">List your property and reach thousands of buyers</p>

        <div className="mt-6 flex flex-col items-center gap-4 md:flex-row md:justify-center">
          <Link
            to="/register?role=owner"
            className="inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-gray-100"
          >
            Register as Owner
          </Link>

          <Link
            to="/register?role=agent"
            className="inline-block rounded-lg border border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
          >
            Register as Agent
          </Link>
        </div>
      </section>
    </div>
  );
}
