import { getContent } from "@/lib/content";
import { Hero } from "@/components/sections/Hero";
import { StatsBar } from "@/components/sections/StatsBar";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { ProgramsPreview } from "@/components/sections/ProgramsPreview";
import { StartupsPreview } from "@/components/sections/StartupsPreview";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { CTABanner } from "@/components/sections/CTABanner";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getContent();
  const news = content.news.filter((item) => item.published !== false);

  return (
    <>
      <Hero siteConfig={content.siteConfig} />
      <StatsBar stats={content.stats} />
      <CapabilitiesSection capabilities={content.capabilities} />
      <ProgramsPreview programs={content.programs} />
      <StartupsPreview startups={content.startups} />
      <TestimonialsSection testimonials={content.testimonials} />
      <NewsPreview news={news} />
      <CTABanner siteConfig={content.siteConfig} />
    </>
  );
}
