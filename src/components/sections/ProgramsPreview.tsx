import { Check } from "lucide-react";
import type { Program } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface ProgramsPreviewProps {
  programs: Program[];
}

export function ProgramsPreview({ programs }: ProgramsPreviewProps) {
  return (
    <section className="section-padding grid-pattern bg-surface">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Programs"
          title="A Path for Every Stage"
          description="Whether you're validating an idea or preparing for international expansion, we have a program designed for your journey."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {programs.slice(0, 4).map((program) => (
            <div
              key={program.id}
              className={cn(
                "relative rounded-2xl border bg-white p-8 transition-all duration-300",
                program.featured
                  ? "border-mint-primary shadow-xl shadow-mint-primary/10"
                  : "border-gray-100 hover:border-mint-primary/30 hover:shadow-lg"
              )}
            >
              {program.featured && (
                <div className="absolute -top-3 right-6 rounded-full bg-mint-primary px-4 py-1 text-xs font-semibold text-white">
                  {program.badge}
                </div>
              )}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-bold text-navy">{program.title}</h3>
                <span className="rounded-full bg-mint-primary/10 px-3 py-1 text-xs font-medium text-mint-primary">
                  {program.duration}
                </span>
              </div>
              <p className="mb-6 leading-relaxed text-slate-muted">
                {program.description}
              </p>
              <ul className="mb-6 space-y-2">
                {program.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-navy/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/programs/" variant="outline" showArrow>
            View All Programs
          </Button>
        </div>
      </div>
    </section>
  );
}
