import type { Startup } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const stageColors: Record<string, string> = {
  Early: "bg-blue-100 text-blue-700",
  Growth: "bg-mint-primary/10 text-mint-primary",
  Scale: "bg-eth-gold/20 text-amber-800",
};

interface StartupsPreviewProps {
  startups: Startup[];
}

export function StartupsPreview({ startups }: StartupsPreviewProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Our Ecosystem"
          title="Startups Building the Future"
          description="Meet the innovators transforming Ethiopia's economy — from AgriTech to FinTech, HealthTech to Clean Energy."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {startups.map((startup) => (
            <div
              key={startup.id}
              className="group rounded-2xl border border-gray-100 p-6 transition-all duration-300 hover:border-mint-primary/30 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-navy-light text-sm font-bold text-white">
                  {startup.name.slice(0, 2).toUpperCase()}
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${stageColors[startup.stage] || stageColors.Early}`}
                >
                  {startup.stage}
                </span>
              </div>
              <h3 className="mb-1 text-lg font-bold text-navy">{startup.name}</h3>
              <p className="mb-3 text-sm font-medium text-mint-primary">
                {startup.sector}
              </p>
              <p className="text-sm leading-relaxed text-slate-muted">
                {startup.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/startups/" variant="outline" showArrow>
            Explore All Startups
          </Button>
        </div>
      </div>
    </section>
  );
}
