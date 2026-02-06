const WhyPostWithUs = () => {
  const items = [
    "Reach serious buyers and tenants faster",
    "Get dedicated support and guidance",
    "Track responses in real time",
    "Boost visibility with featured options"
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <h3 className="text-2xl font-bold text-gray-800">Why post with us</h3>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="rounded-lg border border-gray-100 p-4 text-sm text-gray-600">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyPostWithUs;
