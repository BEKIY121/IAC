import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Innovation & Incubation Center team.",
};

export default async function ContactPage() {
  const { siteConfig } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="We'd Love to Hear From You"
        description="Whether you're a founder with questions, a potential partner, or a member of the press — our team is here to help."
      />
      <ContactForm siteConfig={siteConfig} />
    </>
  );
}
