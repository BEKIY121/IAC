import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { CTABanner } from "@/components/sections/CTABanner";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "News & Events",
  description:
    "Latest news, announcements, and events from the Innovation & Incubation Center and the MinT ecosystem.",
};

export default async function NewsPage() {
  const content = await getContent();
  const news = content.news.filter((item) => item.published !== false);

  return (
    <>
      <PageHero
        eyebrow="News & Events"
        title="Stay in the Loop"
        description="Follow the latest developments at IAC — from new cohort announcements and Demo Days to policy updates and partnership launches."
      />

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <div className="space-y-6">
            {news.map((item, i) => (
              <article
                key={item.id}
                className={`flex flex-col gap-6 rounded-2xl border border-gray-100 p-8 transition hover:border-mint-primary/30 hover:shadow-lg lg:flex-row lg:items-center ${
                  i === 0 ? "bg-mint-primary/5 border-mint-primary/20" : "bg-white"
                }`}
              >
                <div className="flex h-20 w-full shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-navy to-mint-primary-dark lg:w-32">
                  <span className="text-2xl font-bold text-white/90">
                    {item.date.split(" ")[0].slice(0, 3)}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-3">
                    <span className="rounded-full bg-mint-primary/10 px-3 py-1 text-xs font-semibold text-mint-primary">
                      {item.category}
                    </span>
                    <time className="text-sm text-slate-muted">{item.date}</time>
                  </div>
                  <h2 className="mb-2 text-xl font-bold text-navy">{item.title}</h2>
                  <p className="leading-relaxed text-slate-muted">{item.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner siteConfig={content.siteConfig} />
    </>
  );
}
