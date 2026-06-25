import type { NewsItem } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

interface NewsPreviewProps {
  news: NewsItem[];
}

export function NewsPreview({ news }: NewsPreviewProps) {
  return (
    <section className="section-padding bg-surface">
      <div className="container-narrow">
        <SectionHeading
          eyebrow="Stay Updated"
          title="News & Events"
          description="The latest announcements, events, and milestones from IAC and the broader MinT innovation ecosystem."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {news.slice(0, 4).map((item) => (
            <article
              key={item.id}
              className="group rounded-2xl border border-gray-100 bg-white p-6 transition-all hover:border-mint-primary/30 hover:shadow-lg"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full bg-mint-primary/10 px-3 py-1 text-xs font-semibold text-mint-primary">
                  {item.category}
                </span>
                <time className="text-xs text-slate-muted">{item.date}</time>
              </div>
              <h3 className="mb-2 text-lg font-bold text-navy transition group-hover:text-mint-primary">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-muted">
                {item.excerpt}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button href="/news/" variant="outline" showArrow>
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
}
