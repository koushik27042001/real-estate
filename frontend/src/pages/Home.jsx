import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* ================= HERO ================= */}
      <section className="relative flex min-h-screen items-center justify-center bg-[url('https://images.unsplash.com/photo-1568605114967-8130f3a36994')] bg-cover bg-center pt-20">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 w-full max-w-4xl px-6 text-center text-white">
          <h2 className="text-4xl font-bold md:text-5xl">
            Find Your Dream Home
          </h2>

          <p className="mt-4 text-lg text-gray-200">
            Buy, Rent or Sell properties across India
          </p>

          {/* Search Box */}
          <div className="mt-8 grid gap-4 rounded-xl bg-white p-4 md:grid-cols-4">
            <input
              className="rounded border p-3 text-gray-800"
              placeholder="Enter City"
            />

            <select className="rounded border p-3 text-gray-800">
              <option>Property Type</option>
              <option>Apartment</option>
              <option>Villa</option>
              <option>Plot</option>
            </select>

            <select className="rounded border p-3 text-gray-800">
              <option>Budget</option>
              <option>₹20L - ₹50L</option>
              <option>₹50L - ₹1Cr</option>
              <option>₹1Cr+</option>
            </select>

            <Link
              to="/properties"
              className="flex items-center justify-center rounded bg-blue-600 font-semibold text-white hover:bg-blue-700"
            >
              Search
            </Link>
          </div>
        </div>
      </section>

      {/* ================= FEATURED PROPERTIES ================= */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h3 className="mb-8 text-3xl font-bold text-gray-800">
          Featured Properties
        </h3>

        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-xl bg-white shadow hover:shadow-lg transition"
            >
              <img
                src="https://images.unsplash.com/photo-1570129477492-45c003edd2be"
                className="h-48 w-full object-cover"
                alt="Property"
              />

              <div className="p-5">
                <h4 className="text-lg font-semibold">
                  Luxury Apartment
                </h4>

                <p className="text-sm text-gray-500">
                  Bangalore, India
                </p>

                <p className="mt-2 font-bold text-blue-600">
                  ₹85 Lakhs
                </p>

                <Link
                  to="/property/1"
                  className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h3 className="mb-10 text-center text-3xl font-bold text-gray-800">
            Why Choose EstatePro?
          </h3>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <h4 className="text-xl font-semibold">
                Verified Listings
              </h4>
              <p className="mt-2 text-gray-600">
                100% authentic and verified properties
              </p>
            </div>

            <div className="text-center">
              <h4 className="text-xl font-semibold">
                Best Prices
              </h4>
              <p className="mt-2 text-gray-600">
                Competitive market prices guaranteed
              </p>
            </div>

            <div className="text-center">
              <h4 className="text-xl font-semibold">
                Expert Support
              </h4>
              <p className="mt-2 text-gray-600">
                Dedicated relationship managers
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="bg-blue-600 py-16 text-center text-white">
        <h3 className="text-3xl font-bold">
          Ready to Sell or Rent Your Property?
        </h3>

        <p className="mt-3">
          List your property and reach thousands of buyers
        </p>

        <Link
          to="/register"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-blue-600 hover:bg-gray-100"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}
