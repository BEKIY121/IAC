"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import type { SiteConfig } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { IacLogo, MintLogo } from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

interface HeaderProps {
  siteConfig: SiteConfig;
}

export function Header({ siteConfig }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-xl">
      {/* MinT ownership bar */}
      <div className="bg-navy text-white">
        <div className="container-narrow flex items-center justify-between px-4 py-2 text-xs sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-2 w-2 rounded-full bg-eth-green" />
            <span className="inline-flex h-2 w-2 rounded-full bg-eth-gold" />
            <span className="inline-flex h-2 w-2 rounded-full bg-eth-red" />
            <span className="ml-2 opacity-80">
              An initiative of the{" "}
              <strong className="font-semibold text-white">
                {siteConfig.owner.shortName}
              </strong>{" "}
              — {siteConfig.owner.name}
            </span>
          </div>
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="hidden opacity-80 transition hover:opacity-100 sm:block"
          >
            {siteConfig.contact.email}
          </a>
        </div>
      </div>

      <nav className="container-narrow flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3 sm:gap-4">
          <MintLogo size="xl" priority />
          <span className="hidden h-12 w-px bg-gray-300 sm:block" aria-hidden="true" />
          <IacLogo size="md" priority className="transition group-hover:opacity-90" />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-navy/80 transition hover:bg-mint-primary/5 hover:text-mint-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/apply/" variant="primary" size="sm" showArrow>
            Apply Now
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-navy lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        className={cn(
          "overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 lg:hidden",
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="container-narrow space-y-1 px-4 py-4 sm:px-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-navy transition hover:bg-mint-primary/5"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Button
              href="/apply/"
              variant="primary"
              size="md"
              className="w-full"
              showArrow
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
