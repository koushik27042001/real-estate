import { useState } from "react";
import Tabs from "./Tabs";
import SearchBar from "./SearchBar";
import FooterLinks from "./FooterLinks";

const LocationDropdown = ({ open, onClose }) => {
  const [activeTab, setActiveTab] = useState("Buy");
  const [propertyType, setPropertyType] = useState("Residential");
  const [city, setCity] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 px-4">
      <div
        className="absolute inset-0"
        role="button"
        tabIndex={-1}
        onClick={onClose}
        aria-label="Close location selector"
      />

      <div className="relative w-full max-w-[720px] rounded-xl bg-white p-6 shadow-2xl">
        <div className="text-lg font-bold text-gray-800">Explore real estate in...</div>

        <div className="mt-4">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <SearchBar
            propertyType={propertyType}
            setPropertyType={setPropertyType}
            city={city}
            setCity={setCity}
          />
        </div>

        <div className="mt-6 rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
          Results will appear here based on your selection.
        </div>

        <FooterLinks />
      </div>
    </div>
  );
};

export default LocationDropdown;
