import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const residentialTypes = [
  "Flat / Apartment",
  "Independent House / Villa",
  "Builder Floor",
  "Plot / Land",
  "1 RK",
  "Serviced Apartment",
  "Farmhouse",
  "Other"
];

const commercialTypes = [
  "Office",
  "Retail",
  "Plot / Land",
  "Storage",
  "Industry",
  "Hospitality",
  "Other"
];

const PropertyPostForm = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [purpose, setPurpose] = useState("sell");
  const [category, setCategory] = useState("residential");
  const [propertyType, setPropertyType] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const allowedRoles = ["seller", "agent", "admin"];
  const isAuthorized = user && allowedRoles.includes(user.role);

  const handleSubmit = () => {
    setError("");
    if (loading) return;
    if (!user) {
      navigate("/login", { state: { from: "/postproperty" } });
      return;
    }
    if (!isAuthorized) {
      setError("Only owners or agents can post properties. Please login with the correct role.");
      return;
    }

    // Placeholder for submit action
    console.log("submit", { purpose, category, propertyType, phone });
  };

  const types = category === "residential" ? residentialTypes : commercialTypes;

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
      <h2 className="text-lg font-bold text-gray-800">
        Start posting your property, it's free
      </h2>
      <div className="mt-3 text-xs font-semibold text-gray-500">Add Basic Details</div>

      <div className="mt-4">
        <div className="text-sm font-semibold text-gray-700">You're looking to ...</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            { label: "Sell", value: "sell" },
            { label: "Rent / Lease", value: "rent" },
            { label: "PG", value: "pg" }
          ].map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setPurpose(item.value)}
              className={`rounded-full border px-4 py-1.5 text-xs font-semibold ${
                purpose === item.value
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-700"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-semibold text-gray-700">And it's a ...</div>
        <div className="mt-2 flex gap-4 text-sm text-gray-700">
          {[
            { label: "Residential", value: "residential" },
            { label: "Commercial", value: "commercial" }
          ].map((item) => (
            <label
              key={item.value}
            >
              <input
                type="radio"
                name="category"
                checked={category === item.value}
                onChange={() => {
                  setCategory(item.value);
                  setPropertyType("");
                }}
                className="mr-2 accent-blue-600"
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-semibold text-gray-700">Property Type</div>
        <div className="mt-2 flex flex-wrap gap-2 text-xs">
          {types.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setPropertyType(type)}
              className={`rounded-full border px-3 py-1.5 text-left ${
                propertyType === type
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-semibold text-gray-700">
          Your contact details for the buyer to reach you
        </div>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-600"
        />
        <div className="mt-2 text-xs text-gray-500">
          Are you a registered user?{" "}
          <button
            type="button"
            onClick={() => navigate("/login", { state: { from: "/postproperty" } })}
            className="text-blue-600"
          >
            Login
          </button>
        </div>
      </div>

      {error && <div className="mt-3 text-xs font-semibold text-red-600">{error}</div>}

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-sm font-bold text-white"
      >
        {user ? "Start now" : "Login to continue"}
      </button>
    </div>
  );
};

export default PropertyPostForm;
