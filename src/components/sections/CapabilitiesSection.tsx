import {
  Building2,
  Cpu,
  Globe,
  Lightbulb,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { Capability } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  lightbulb: Lightbulb,
  users: Users,
  building: Building2,
  wallet: Wallet,
  globe: Globe,
  cpu: Cpu,
};

interface CapabilitiesSectionProps {
  capabilities: Capability[];
}

export function CapabilitiesSection({ capabilities }: CapabilitiesSectionProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="What We Offer"
          title="Full-Spectrum Startup Support"
          description="From your first idea to scaling across borders, IAC provides the infrastructure, mentorship, and connections startups need to thrive."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap) => {
            const Icon = iconMap[cap.icon] || Lightbulb;
            return (
              <div
                key={cap.title}
                className="group rounded-2xl border border-gray-100 bg-surface p-8 transition-all duration-300 hover:border-mint-primary/30 hover:shadow-lg hover:shadow-mint-primary/5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-mint-primary/10 text-mint-primary transition group-hover:bg-mint-primary group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-navy">{cap.title}</h3>
                <p className="leading-relaxed text-slate-muted">{cap.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
