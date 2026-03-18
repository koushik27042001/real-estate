import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Sparkles, Phone, LogIn } from "lucide-react";

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
    <div className="sticky top-24 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5">
      <div className="flex items-center gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sky-500 to-teal-500 text-white">
          <Sparkles className="h-4 w-4" />
        </span>
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Start posting your property, it's free
          </h2>
          <p className="text-xs font-medium text-slate-500">Add Basic Details</p>
        </div>
      </div>

      <div className="mt-6 space-y-5">
        <div>
          <label className="text-sm font-semibold text-slate-700">You're looking to ...</label>
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
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                  purpose === item.value
                    ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm"
                    : "border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-300"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">And it's a ...</label>
          <div className="mt-2 flex gap-6 text-sm text-slate-700">
            {[
              { label: "Residential", value: "residential" },
              { label: "Commercial", value: "commercial" }
            ].map((item) => (
              <label key={item.value} className="flex cursor-pointer items-center gap-2">
                <input
                  type="radio"
                  name="category"
                  checked={category === item.value}
                  onChange={() => {
                    setCategory(item.value);
                    setPropertyType("");
                  }}
                  className="h-4 w-4 accent-sky-600"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700">Property Type</label>
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {types.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setPropertyType(type)}
                className={`rounded-full border px-3 py-2 text-left transition-all ${
                  propertyType === type
                    ? "border-sky-500 bg-sky-50 text-sky-700 shadow-sm"
                    : "border-slate-200 bg-slate-50/50 text-slate-600 hover:border-slate-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Phone className="h-3.5 w-3.5 text-slate-500" />
            Your contact details for the buyer to reach you
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/20"
          />
          <p className="mt-2 flex items-center gap-1 text-xs text-slate-500">
            Are you a registered user?{" "}
            <button
              type="button"
              onClick={() => navigate("/login", { state: { from: "/postproperty" } })}
              className="inline-flex items-center gap-1 font-semibold text-sky-600 hover:text-sky-700"
            >
              <LogIn className="h-3 w-3" />
              Login
            </button>
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-sky-600 to-teal-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/30"
      >
        {user ? "Start now" : "Login to continue"}
      </button>
    </div>
  );
};

export default PropertyPostForm;
