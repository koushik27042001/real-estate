import { FileEdit, Image, DollarSign, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Add details of your property",
    desc: "Property type, location, rooms",
    icon: FileEdit,
    color: "sky"
  },
  {
    step: "02",
    title: "Upload Photos and Videos",
    desc: "Upload via desktop or mobile",
    icon: Image,
    color: "teal"
  },
  {
    step: "03",
    title: "Add Pricing and Ownership",
    desc: "Expected price and ownership details",
    icon: DollarSign,
    color: "amber"
  }
];

const colorMap = {
  sky: "bg-sky-100 text-sky-600",
  teal: "bg-teal-100 text-teal-600",
  amber: "bg-amber-100 text-amber-600"
};

const StepsSection = () => {
  return (
    <section className="relative bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600">
            How it works
          </span>
          <h3 className="mt-3 text-2xl font-bold text-slate-800 md:text-3xl">
            Post in 3 simple steps
          </h3>
          <p className="mt-2 text-slate-600">Get your property listed in minutes</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="group relative">
                <div className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-100/50">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${colorMap[item.color]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="mt-4 text-xs font-bold tracking-wider text-slate-400">
                    STEP {item.step}
                  </span>
                  <h4 className="mt-2 text-lg font-bold text-slate-800">{item.title}</h4>
                  <p className="mt-2 flex-1 text-sm text-slate-500">{item.desc}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-3 md:block">
                    <ArrowRight className="h-5 w-5 text-slate-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
