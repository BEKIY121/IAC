import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { navLinks } from "@/lib/data";
import type { SiteConfig } from "@/lib/types";
import { IacLogo, MintLogo } from "@/components/ui/Logo";

interface FooterProps {
  siteConfig: SiteConfig;
}

export function Footer({ siteConfig }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="section-padding pb-12">
        <div className="container-narrow">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="mb-4">
                <IacLogo size="md" onDark />
              </div>
              <div className="mb-4 flex items-center gap-2">
                <MintLogo size="xs" />
                <span className="text-xs text-white/60">Under {siteConfig.owner.shortName}</span>
              </div>
              <p className="text-sm leading-relaxed text-white/70">
                {siteConfig.description}
              </p>
              <div className="mt-4 flex gap-2">
                <span className="h-1 w-8 rounded-full bg-eth-green" />
                <span className="h-1 w-8 rounded-full bg-eth-gold" />
                <span className="h-1 w-8 rounded-full bg-eth-red" />
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-wider text-white/90 uppercase">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition hover:text-mint-primary-light"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-wider text-white/90 uppercase">
                Programs
              </h3>
              <ul className="space-y-2.5 text-sm text-white/70">
                <li>
                  <Link href="/programs/" className="transition hover:text-mint-primary-light">
                    Pre-Incubation
                  </Link>
                </li>
                <li>
                  <Link href="/programs/" className="transition hover:text-mint-primary-light">
                    Incubation Program
                  </Link>
                </li>
                <li>
                  <Link href="/programs/" className="transition hover:text-mint-primary-light">
                    Acceleration
                  </Link>
                </li>
                <li>
                  <Link href="/programs/" className="transition hover:text-mint-primary-light">
                    Sector Innovation Labs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold tracking-wider text-white/90 uppercase">
                Contact
              </h3>
              <ul className="space-y-3 text-sm text-white/70">
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-mint-primary-light" />
                  {siteConfig.contact.address}
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 shrink-0 text-mint-primary-light" />
                  {siteConfig.contact.phone}
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-mint-primary-light" />
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="transition hover:text-mint-primary-light"
                  >
                    {siteConfig.contact.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-narrow flex flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-center text-sm text-white/50">
            © {currentYear} {siteConfig.fullName}. A{" "}
            <strong className="text-white/70">{siteConfig.owner.shortName}</strong>{" "}
            initiative. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <Link href="/about/" className="transition hover:text-white/80">
              Privacy Policy
            </Link>
            <Link href="/about/" className="transition hover:text-white/80">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
