import type { Stat } from "@/lib/types";

interface StatsBarProps {
  stats: Stat[];
}

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <section className="relative -mt-8 z-10 px-4 sm:px-6 lg:px-8">
      <div className="container-narrow">
        <div className="grid grid-cols-2 gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-xl shadow-navy/5 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-gray-100 lg:p-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center lg:px-6">
              <div className="text-3xl font-bold text-mint-primary sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-slate-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
