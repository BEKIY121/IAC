import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/sections/CTABanner";
import { getContent } from "@/lib/content";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore IAC's incubation, acceleration, and sector innovation programs designed for startups at every stage.",
};

export default async function ProgramsPage() {
  const { programs, siteConfig } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Programs"
        title="Programs Built for Every Founder"
        description="From first-time entrepreneurs to growth-stage ventures, our structured programs provide the mentorship, resources, and community you need at each milestone."
      />

      <section className="section-padding bg-white">
        <div className="container-narrow space-y-8">
          {programs.map((program) => (
            <div
              key={program.id}
              className={cn(
                "rounded-2xl border p-8 lg:p-10",
                program.featured
                  ? "border-mint-primary bg-mint-primary/5 shadow-xl shadow-mint-primary/10"
                  : "border-gray-100 bg-surface"
              )}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex-1">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <h2 className="text-2xl font-bold text-navy">{program.title}</h2>
                    <span className="rounded-full bg-mint-primary/10 px-3 py-1 text-xs font-semibold text-mint-primary">
                      {program.badge}
                    </span>
                    <span className="rounded-full bg-navy/5 px-3 py-1 text-xs font-medium text-navy/70">
                      {program.duration}
                    </span>
                  </div>
                  <p className="mb-6 max-w-2xl leading-relaxed text-slate-muted">
                    {program.description}
                  </p>
                  <ul className="grid gap-2 sm:grid-cols-2">
                    {program.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-navy/80"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button href="/apply/" variant={program.featured ? "primary" : "outline"} showArrow>
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABanner siteConfig={siteConfig} />
    </>
  );
}
