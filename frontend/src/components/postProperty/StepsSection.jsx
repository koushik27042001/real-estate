const steps = [
  {
    step: "01",
    title: "Add details of your property",
    desc: "Property type, location, rooms"
  },
  {
    step: "02",
    title: "Upload Photos and Videos",
    desc: "Upload via desktop or mobile"
  },
  {
    step: "03",
    title: "Add Pricing and Ownership",
    desc: "Expected price and ownership details"
  }
];

const StepsSection = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h3 className="text-2xl font-bold text-gray-800">Post in 3 simple steps</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {steps.map((item) => (
          <div key={item.step} className="rounded-xl border border-gray-100 p-5 shadow-sm">
            <div className="text-xs font-bold text-blue-600">{item.step}</div>
            <div className="mt-2 text-base font-semibold text-gray-800">{item.title}</div>
            <div className="mt-2 text-sm text-gray-500">{item.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StepsSection;
