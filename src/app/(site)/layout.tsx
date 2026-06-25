import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent();

  return (
    <div className="flex min-h-screen flex-col bg-surface text-navy">
      <Header siteConfig={content.siteConfig} />
      <main className="flex-1">{children}</main>
      <Footer siteConfig={content.siteConfig} />
    </div>
  );
}
