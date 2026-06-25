import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SiteConfig } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { IacLogo, MintLogo } from "@/components/ui/Logo";

interface HeroProps {
  siteConfig: SiteConfig;
}

export function Hero({ siteConfig }: HeroProps) {
  return (
    <section className="hero-glow relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern" />
      <div className="section-padding relative pb-32">
        <div className="container-narrow">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-8 flex justify-center">
              <IacLogo size="xl" priority />
            </div>

            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-mint-primary/20 bg-white/80 px-4 py-2 text-sm font-medium text-navy shadow-sm backdrop-blur-sm">
              <MintLogo size="xs" />
              <span>
                Powered by {siteConfig.owner.shortName} — Ministry of Innovation & Technology
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:text-7xl">
              Where Ethiopian{" "}
              <span className="text-gradient">Startups</span>{" "}
              Take Flight
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-muted sm:text-xl">
              {siteConfig.description}
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/apply/" size="lg" showArrow>
                Start Your Journey
              </Button>
              <Button href="/about/" variant="outline" size="lg">
                Learn About IAC
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-muted">
              <Link
                href="/programs/"
                className="group flex items-center gap-1 transition hover:text-mint-primary"
              >
                Explore Programs
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </Link>
              <span className="hidden h-4 w-px bg-gray-200 sm:block" />
              <Link
                href="/startups/"
                className="group flex items-center gap-1 transition hover:text-mint-primary"
              >
                Meet Our Startups
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </Link>
              <span className="hidden h-4 w-px bg-gray-200 sm:block" />
              <Link
                href="/resources/"
                className="group flex items-center gap-1 transition hover:text-mint-primary"
              >
                Founder Resources
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
