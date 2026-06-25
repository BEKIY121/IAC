import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to join the Innovation & Incubation Center programs and start your startup journey.",
};

export default async function ApplyPage() {
  const { programs, applicationSteps } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Apply"
        title="Join the Next Cohort"
        description="Applications for the 2026 incubation cohort are now open. Tell us about your team, your idea, and why you're ready to build."
      />
      <ApplyForm programs={programs} applicationSteps={applicationSteps} />
    </>
  );
}
