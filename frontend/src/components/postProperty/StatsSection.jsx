const stats = [
  { label: "Property Listings", value: "1M" },
  { label: "Monthly Searches", value: "5.5M" },
  { label: "Owners", value: "200K" }
];

const StatsSection = () => {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-6 px-6 py-10">
        {stats.map((stat) => (
          <div key={stat.label} className="flex-1 rounded-xl bg-white p-6 shadow-sm">
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="mt-1 text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
