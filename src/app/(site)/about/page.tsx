import type { Metadata } from "next";
import { PageHero, MissionVisionCards } from "@/components/sections/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTABanner } from "@/components/sections/CTABanner";
import { PartnerLogos, MintLogo } from "@/components/ui/Logo";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { siteConfig } = await getContent();
  return {
    title: "About Us",
    description: `Learn about the Innovation & Incubation Center (IAC), an initiative of ${siteConfig.owner.name} empowering Ethiopian startups.`,
  };
}

export default async function AboutPage() {
  const content = await getContent();
  const { siteConfig, values, timeline } = content;

  return (
    <>
      <PageHero
        eyebrow="About IAC"
        title="Building Ethiopia's Innovation Future"
        description={`The Innovation & Incubation Center (IAC) is the flagship startup support platform of the ${siteConfig.owner.name} (${siteConfig.owner.shortName}). We exist to turn Ethiopia's entrepreneurial energy into enterprises that create jobs, solve problems, and compete globally.`}
      />

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <PartnerLogos className="mb-16" />
          <MissionVisionCards siteConfig={siteConfig} />
        </div>
      </section>

      <section className="section-padding grid-pattern bg-surface">
        <div className="container-narrow">
          <SectionHeading
            eyebrow="Our Values"
            title="What Guides Everything We Do"
            description="Our values reflect both the ambition of Ethiopia's innovation agenda and the human-centered approach we take with every founder."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.id}
                className="rounded-2xl border border-gray-100 bg-white p-6"
              >
                <h3 className="mb-3 text-lg font-bold text-navy">{value.title}</h3>
                <p className="text-sm leading-relaxed text-slate-muted">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <SectionHeading
            eyebrow="Our Journey"
            title="A Timeline of Growth"
            description="From a bold policy vision to a thriving ecosystem — here's how IAC has evolved to serve Ethiopia's innovators."
          />
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute top-0 bottom-0 left-8 w-px bg-mint-primary/20 md:left-1/2" />
            {timeline.map((item, i) => (
              <div
                key={item.id}
                className={`relative mb-10 flex items-start gap-6 md:gap-0 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden flex-1 md:block" />
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-white bg-mint-primary text-sm font-bold text-white shadow-lg md:absolute md:left-1/2 md:-translate-x-1/2">
                  {item.year}
                </div>
                <div className="flex-1 rounded-2xl border border-gray-100 bg-surface p-6 md:max-w-md">
                  <p className="leading-relaxed text-navy/80">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy text-white">
        <div className="container-narrow">
          <div className="mx-auto max-w-3xl text-center">
            <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-mint-primary-light uppercase">
              Our Parent Institution
            </span>
            <div className="mb-6 flex justify-center">
              <MintLogo size="xl" />
            </div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              {siteConfig.owner.name}
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              {siteConfig.owner.description} IAC operates under MinT&apos;s
              mandate to foster a vibrant technology and innovation ecosystem,
              aligning startup development with national digital transformation
              goals.
            </p>
            <div className="mt-8 flex justify-center gap-2">
              <span className="h-1.5 w-12 rounded-full bg-eth-green" />
              <span className="h-1.5 w-12 rounded-full bg-eth-gold" />
              <span className="h-1.5 w-12 rounded-full bg-eth-red" />
            </div>
          </div>
        </div>
      </section>

      <CTABanner siteConfig={siteConfig} />
    </>
  );
}
