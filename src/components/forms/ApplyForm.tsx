"use client";

import { useState } from "react";
import { Check, CheckCircle, AlertCircle } from "lucide-react";
import type { ApplicationStep, Program } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface ApplyFormProps {
  programs: Program[];
  applicationSteps: ApplicationStep[];
}

export function ApplyForm({ programs, applicationSteps }: ApplyFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      founderName: formData.get("founderName") as string,
      email: formData.get("email") as string,
      startupName: formData.get("startupName") as string,
      program: formData.get("program") as string,
      sector: formData.get("sector") as string,
      stage: formData.get("stage") as string,
      pitch: formData.get("pitch") as string,
      website: formData.get("website") as string,
    };

    try {
      const res = await fetch("/api/apply/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit application");
      }

      setStatus("success");
      form.reset();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <>
      <section className="section-padding bg-white">
        <div className="container-narrow">
          <SectionHeading
            eyebrow="Process"
            title="How Application Works"
            description="Our selection process is designed to be transparent and supportive — we want to understand your vision and how IAC can help."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {applicationSteps.map((step) => (
              <div key={step.id} className="relative rounded-2xl border border-gray-100 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-mint-primary text-sm font-bold text-white">
                  {step.step}
                </div>
                <h3 className="mb-2 font-bold text-navy">{step.title}</h3>
                <p className="text-sm leading-relaxed text-slate-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding grid-pattern bg-surface">
        <div className="container-narrow">
          {status === "success" && (
            <div className="mb-8 flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-6 text-green-800">
              <CheckCircle className="h-6 w-6 shrink-0" />
              <div>
                <p className="font-semibold">Application submitted successfully!</p>
                <p className="text-sm">Our team will review your application and contact you soon.</p>
              </div>
            </div>
          )}

          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="mb-4 text-2xl font-bold text-navy">Choose Your Program</h2>
              <p className="mb-6 text-slate-muted">
                Select the program that best matches your current stage. Not sure?
                Apply anyway — our team will help you find the right fit.
              </p>
              <ul className="space-y-3">
                {programs.map((p) => (
                  <li key={p.id} className="flex items-start gap-2 text-sm text-navy/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-mint-primary" />
                    <span>
                      <strong>{p.title}</strong> — {p.duration}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <form
              onSubmit={handleSubmit}
              className="lg:col-span-3 rounded-2xl border border-gray-100 bg-white p-8 shadow-sm"
            >
              <h2 className="mb-6 text-2xl font-bold text-navy">Application Form</h2>

              {status === "error" && (
                <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-red-800">
                  <AlertCircle className="h-5 w-5" />
                  {error}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="founderName" className="mb-1.5 block text-sm font-medium text-navy">
                    Founder Name *
                  </label>
                  <input
                    id="founderName"
                    name="founderName"
                    type="text"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 transition focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 transition focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="startupName" className="mb-1.5 block text-sm font-medium text-navy">
                    Startup Name *
                  </label>
                  <input
                    id="startupName"
                    name="startupName"
                    type="text"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 transition focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="program" className="mb-1.5 block text-sm font-medium text-navy">
                    Program *
                  </label>
                  <select
                    id="program"
                    name="program"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 transition focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 focus:outline-none"
                  >
                    {programs.map((p) => (
                      <option key={p.id} value={p.title}>
                        {p.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="sector" className="mb-1.5 block text-sm font-medium text-navy">
                    Sector *
                  </label>
                  <select
                    id="sector"
                    name="sector"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 transition focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 focus:outline-none"
                  >
                    <option>AgriTech</option>
                    <option>FinTech</option>
                    <option>HealthTech</option>
                    <option>EdTech</option>
                    <option>Clean Energy</option>
                    <option>Logistics</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="stage" className="mb-1.5 block text-sm font-medium text-navy">
                    Current Stage *
                  </label>
                  <select
                    id="stage"
                    name="stage"
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 transition focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 focus:outline-none"
                  >
                    <option>Idea Stage</option>
                    <option>MVP / Prototype</option>
                    <option>Early Revenue</option>
                    <option>Growth / Scaling</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="pitch" className="mb-1.5 block text-sm font-medium text-navy">
                    Tell us about your startup *
                  </label>
                  <textarea
                    id="pitch"
                    name="pitch"
                    rows={5}
                    required
                    placeholder="Describe the problem you're solving, your solution, target market, and team..."
                    className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 transition focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="website" className="mb-1.5 block text-sm font-medium text-navy">
                    Website / Demo Link (optional)
                  </label>
                  <input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 transition focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 w-full rounded-xl bg-mint-primary px-6 py-4 font-semibold text-white transition hover:bg-mint-primary-dark disabled:opacity-60 sm:w-auto"
              >
                {status === "loading" ? "Submitting..." : "Submit Application"}
              </button>
              <p className="mt-4 text-xs text-slate-muted">
                By submitting, you agree to be contacted by the IAC team regarding
                your application. We review applications on a rolling basis.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
