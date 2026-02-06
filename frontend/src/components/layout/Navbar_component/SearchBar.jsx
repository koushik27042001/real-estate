const SearchBar = ({ propertyType, setPropertyType, city, setCity }) => {
  return (
    <div className="mt-4 flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-3">
      <select
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        className="text-sm text-gray-700 outline-none"
      >
        <option>Residential</option>
        <option>Commercial</option>
      </select>

      <div className="h-6 w-px bg-gray-200" />

      <input
        type="text"
        placeholder="City Name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 text-sm text-gray-700 placeholder-gray-400 outline-none"
      />

      <button
        type="button"
        className="rounded bg-blue-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white"
      >
        Explore
      </button>
    </div>
  );
};

export default SearchBar;
