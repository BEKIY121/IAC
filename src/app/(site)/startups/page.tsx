import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { CTABanner } from "@/components/sections/CTABanner";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Startups",
  description:
    "Discover the innovative startups nurtured at IAC — building solutions across AgriTech, FinTech, HealthTech, and more.",
};

const stageColors: Record<string, string> = {
  Early: "bg-blue-100 text-blue-700",
  Growth: "bg-mint-primary/10 text-mint-primary",
  Scale: "bg-eth-gold/20 text-amber-800",
};

export default async function StartupsPage() {
  const { startups, siteConfig } = await getContent();
  const sectors = [...new Set(startups.map((s) => s.sector))];

  return (
    <>
      <PageHero
        eyebrow="Our Ecosystem"
        title="Startups Changing Ethiopia"
        description="Our alumni and current cohort members are building the technologies and businesses that will define Ethiopia's economic future. Explore the ventures we're proud to support."
      />

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="mb-10 flex flex-wrap gap-2">
            <span className="rounded-full bg-navy px-4 py-2 text-sm font-medium text-white">
              All Sectors
            </span>
            {sectors.map((sector) => (
              <span
                key={sector}
                className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-navy/70"
              >
                {sector}
              </span>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {startups.map((startup) => (
              <div
                key={startup.id}
                className="group rounded-2xl border border-gray-100 p-8 transition hover:border-mint-primary/30 hover:shadow-xl"
              >
                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-mint-primary-dark text-lg font-bold text-white">
                    {startup.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${stageColors[startup.stage] || stageColors.Early}`}
                  >
                    {startup.stage}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-navy">{startup.name}</h3>
                <p className="mt-1 text-sm font-medium text-mint-primary">
                  {startup.sector} · Cohort {startup.year}
                </p>
                <p className="mt-4 leading-relaxed text-slate-muted">
                  {startup.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding grid-pattern bg-surface">
        <div className="container-narrow text-center">
          <SectionHeading
            eyebrow="Join Them"
            title="Your Startup Could Be Next"
            description="We're always looking for passionate founders with bold ideas. Apply to join our next cohort and build alongside Ethiopia's most promising innovators."
          />
          <Button href="/apply/" size="lg" showArrow>
            Apply to IAC
          </Button>
        </div>
      </section>

      <CTABanner siteConfig={siteConfig} />
    </>
  );
}
