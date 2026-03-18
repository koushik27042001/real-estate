import { Zap, Headphones, BarChart3, Star } from "lucide-react";

const items = [
  {
    title: "Reach serious buyers and tenants faster",
    desc: "Connect with verified leads actively looking for properties",
    icon: Zap,
    color: "sky"
  },
  {
    title: "Get dedicated support and guidance",
    desc: "Our team is here to help you every step of the way",
    icon: Headphones,
    color: "teal"
  },
  {
    title: "Track responses in real time",
    desc: "Monitor enquiries and manage leads from your dashboard",
    icon: BarChart3,
    color: "amber"
  },
  {
    title: "Boost visibility with featured options",
    desc: "Stand out with premium placement and highlighted listings",
    icon: Star,
    color: "violet"
  }
];

const colorMap = {
  sky: "bg-sky-100 text-sky-600",
  teal: "bg-teal-100 text-teal-600",
  amber: "bg-amber-100 text-amber-600",
  violet: "bg-violet-100 text-violet-600"
};

const WhyPostWithUs = () => {
  return (
    <section className="bg-slate-50/80 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <span className="inline-block rounded-full bg-slate-200/80 px-3 py-1 text-xs font-semibold text-slate-600">
            Benefits
          </span>
          <h3 className="mt-3 text-2xl font-bold text-slate-800 md:text-3xl">
            Why post with us
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-slate-600">
            Join thousands of property owners who trust us to find the right buyers and tenants
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group flex gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-50"
              >
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colorMap[item.color]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{item.title}</h4>
                  <p className="mt-1 text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyPostWithUs;
