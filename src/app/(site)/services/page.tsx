import type { Metadata } from "next";
import {
  Calculator,
  Code,
  Megaphone,
  Scale,
  TrendingUp,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/sections/CTABanner";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Comprehensive support services for startups at IAC — from business development to legal, technical, and marketing support.",
};

const iconMap: Record<string, LucideIcon> = {
  "trending-up": TrendingUp,
  scale: Scale,
  calculator: Calculator,
  code: Code,
  "user-plus": UserPlus,
  megaphone: Megaphone,
};

export default async function ServicesPage() {
  const { services, siteConfig } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything You Need to Succeed"
        description="IAC provides end-to-end support services so founders can focus on building great products. Our team and partner network cover every critical business function."
      />

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || TrendingUp;
              return (
                <div
                  key={service.id}
                  className="group rounded-2xl border border-gray-100 p-8 transition hover:border-mint-primary/30 hover:shadow-lg"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-mint-primary/10 to-mint-primary/5 text-mint-primary transition group-hover:from-mint-primary group-hover:to-mint-primary-dark group-hover:text-white">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-navy">{service.title}</h3>
                  <p className="leading-relaxed text-slate-muted">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding grid-pattern bg-surface">
        <div className="container-narrow">
          <SectionHeading
            eyebrow="How It Works"
            title="Access Services Through Your Program"
            description="All IAC program participants receive core services as part of their enrollment. Additional specialized support is available on request through our partner network."
          />
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Enroll",
                text: "Join an IAC program that matches your startup stage and sector.",
              },
              {
                step: "02",
                title: "Assess",
                text: "Work with your mentor to identify priority service needs.",
              },
              {
                step: "03",
                title: "Access",
                text: "Connect with specialists, workshops, and resources tailored to you.",
              },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl bg-white p-8 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-mint-primary text-lg font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-bold text-navy">{item.title}</h3>
                <p className="text-sm text-slate-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner siteConfig={siteConfig} />
    </>
  );
}
