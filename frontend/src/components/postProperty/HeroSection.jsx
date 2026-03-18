import { Home, CheckCircle2 } from "lucide-react";

const HeroSection = () => {
  const benefits = [
    "Advertise for FREE",
    "Get unlimited enquiries",
    "Get shortlisted buyers and tenants *",
    "Assistance in coordinating site visits *"
  ];

  return (
    <div className="space-y-8">
      <div className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-1.5 text-xs font-semibold text-sky-700">
        <Home className="h-3.5 w-3.5" />
        <span>List your property in minutes</span>
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
        Sell or Rent Property
        <span className="mt-2 block bg-gradient-to-r from-sky-600 to-teal-600 bg-clip-text text-transparent">
          online faster with 99acres.com
        </span>
      </h1>

      <ul className="space-y-3">
        {benefits.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            </span>
            <span className="text-sm font-medium text-slate-700">{item}</span>
          </li>
        ))}
      </ul>

      <p className="text-xs text-slate-500">
        * Available with Owner Assist Plans
      </p>

      <div className="relative pt-4">
        <div className="absolute -left-2 -top-2 h-24 w-24 rounded-full bg-sky-200/40 blur-2xl" />
        <img
          src="/post-property-illustration.svg"
          alt="Posting property illustration"
          className="relative w-full max-w-md drop-shadow-lg transition-transform hover:scale-[1.02]"
        />
      </div>
    </div>
  );
};

export default HeroSection;
