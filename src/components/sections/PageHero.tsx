import type { SiteConfig } from "@/lib/types";
import { Building2, Target, Eye } from "lucide-react";

interface PageHeroProps {
  title: string;
  description: string;
  eyebrow?: string;
}

export function PageHero({ title, description, eyebrow }: PageHeroProps) {
  return (
    <section className="hero-glow relative overflow-hidden border-b border-gray-100">
      <div className="absolute inset-0 grid-pattern" />
      <div className="section-padding relative pb-16">
        <div className="container-narrow">
          {eyebrow && (
            <span className="mb-4 inline-block rounded-full bg-mint-primary/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-mint-primary uppercase">
              {eyebrow}
            </span>
          )}
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-muted">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export function MissionVisionCards({ siteConfig }: { siteConfig: SiteConfig }) {
  const cards = [
    {
      icon: Target,
      title: "Our Mission",
      text: "To catalyze Ethiopia's innovation economy by providing world-class incubation services, mentorship, and ecosystem connections that empower startups to create lasting impact.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      text: "To be East Africa's leading government-backed innovation hub — where every bold idea has the support, resources, and community needed to become a thriving enterprise.",
    },
    {
      icon: Building2,
      title: "Our Mandate",
      text: `As an initiative of the ${siteConfig.owner.name} (${siteConfig.owner.shortName}), IAC serves as the national platform for startup development, bridging policy, academia, and industry.`,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-mint-primary/10 text-mint-primary">
            <card.icon className="h-6 w-6" />
          </div>
          <h3 className="mb-3 text-xl font-bold text-navy">{card.title}</h3>
          <p className="leading-relaxed text-slate-muted">{card.text}</p>
        </div>
      ))}
    </div>
  );
}
