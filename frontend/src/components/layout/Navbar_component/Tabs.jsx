const Tabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["Buy", "Rent / Lease", "Plots / Land", "PG / Co-living"];

  return (
    <div className="flex gap-6 border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => setActiveTab(tab)}
          className={`pb-2 text-sm font-semibold transition-colors ${
            activeTab === tab
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
