const HeroSection = () => {
  const benefits = [
    "Advertise for FREE",
    "Get unlimited enquiries",
    "Get shortlisted buyers and tenants *",
    "Assistance in coordinating site visits *"
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
        Sell or Rent Property
        <span className="block text-blue-600">online faster with 99acres.com</span>
      </h1>
      <ul className="mt-6 space-y-2 text-sm text-gray-700">
        {benefits.map((item) => (
          <li key={item} className="flex items-start gap-2">
            <span className="mt-1 flex h-4 w-4 items-center justify-center rounded-full border border-green-500 text-[10px] font-bold text-green-600">
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="mt-10 text-xs text-gray-400">* Available with Owner Assist Plans</div>
      <div className="mt-8 flex items-center justify-start">
        <img
          src="/post-property-illustration.svg"
          alt="Posting property illustration"
          className="w-full max-w-md"
        />
      </div>
    </div>
  );
};

export default HeroSection;
