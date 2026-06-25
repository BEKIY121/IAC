import { Button } from "@/components/ui/Button";
import type { SiteConfig } from "@/lib/types";

interface CTABannerProps {
  siteConfig: SiteConfig;
}

export function CTABanner({ siteConfig }: CTABannerProps) {
  return (
    <section className="section-padding">
      <div className="container-narrow">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-mint-primary via-mint-primary-dark to-navy px-8 py-16 text-center text-white sm:px-16 sm:py-20">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-eth-gold/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-mint-primary-light/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Build Something Extraordinary?
            </h2>
            <p className="mt-4 text-lg text-white/80">
              Join {siteConfig.fullName} and become part of Ethiopia&apos;s
              fastest-growing startup ecosystem. Applications for the 2026 cohort
              are now open.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href="/apply/"
                variant="secondary"
                size="lg"
                className="bg-white text-mint-primary-dark hover:bg-white/90"
                showArrow
              >
                Apply to IAC
              </Button>
              <Button
                href="/contact/"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-mint-primary-dark"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
