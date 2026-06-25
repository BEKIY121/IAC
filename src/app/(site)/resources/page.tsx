import type { Metadata } from "next";
import { Download, FileText, Video, BookOpen } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { CTABanner } from "@/components/sections/CTABanner";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free tools, guides, and resources for Ethiopian entrepreneurs — from business plan templates to investor directories.",
};

const typeIcons: Record<string, typeof FileText> = {
  Download: Download,
  Guide: BookOpen,
  Video: Video,
  Directory: FileText,
  Report: FileText,
};

export default async function ResourcesPage() {
  const { resources, siteConfig } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Tools for Founders"
        description="Access free resources curated by IAC and MinT to help you navigate the startup journey — from incorporation to investment."
      />

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => {
              const Icon = typeIcons[resource.type] || FileText;
              return (
                <div
                  key={resource.id}
                  className="group flex flex-col rounded-2xl border border-gray-100 p-8 transition hover:border-mint-primary/30 hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mint-primary/10 text-mint-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-surface px-3 py-1 text-xs font-medium text-slate-muted">
                      {resource.type}
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-navy">{resource.title}</h3>
                  <p className="flex-1 text-sm leading-relaxed text-slate-muted">
                    {resource.description}
                  </p>
                  {resource.url ? (
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 text-sm font-semibold text-mint-primary transition group-hover:underline"
                    >
                      Access Resource →
                    </a>
                  ) : (
                    <span className="mt-4 text-sm font-semibold text-mint-primary">
                      Access Resource →
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-navy text-white">
        <div className="container-narrow mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">Need Personalized Guidance?</h2>
          <p className="mt-4 text-lg text-white/70">
            Our mentors and program team are available to help you make the most
            of these resources. Enroll in an IAC program for hands-on support.
          </p>
        </div>
      </section>

      <CTABanner siteConfig={siteConfig} />
    </>
  );
}
