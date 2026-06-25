import type { Testimonial } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="section-padding bg-navy text-white">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Founder Stories"
          title="Voices from Our Community"
          description="Real stories from entrepreneurs who turned vision into venture with IAC's support."
          className="[&_h2]:text-white [&_p]:text-white/70 [&_span]:bg-white/10 [&_span]:text-mint-primary-light"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
            >
              <div className="mb-6 text-4xl leading-none text-mint-primary-light">
                &ldquo;
              </div>
              <p className="mb-6 leading-relaxed text-white/80">{t.quote}</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-mint-primary text-sm font-bold">
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold">{t.author}</div>
                  <div className="text-sm text-white/60">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
