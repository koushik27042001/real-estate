import { Building2, Search, Users } from "lucide-react";

const stats = [
  { label: "Property Listings", value: "1M+", icon: Building2, suffix: "" },
  { label: "Monthly Searches", value: "5.5M", icon: Search, suffix: "+" },
  { label: "Active Owners", value: "200K", icon: Users, suffix: "+" }
];

const StatsSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-500/10 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="group flex flex-col items-center rounded-2xl border border-slate-700/50 bg-slate-800/50 p-8 backdrop-blur transition-all duration-300 hover:border-sky-500/30 hover:bg-slate-800/80"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-sky-500/20 text-sky-400 transition-colors group-hover:bg-sky-500/30">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="mt-4 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                  {stat.value}
                  <span className="text-sky-400">{stat.suffix}</span>
                </div>
                <div className="mt-1 text-sm font-medium text-slate-400">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
