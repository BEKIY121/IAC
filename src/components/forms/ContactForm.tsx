"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Clock, CheckCircle, AlertCircle } from "lucide-react";
import type { SiteConfig } from "@/lib/types";

interface ContactFormProps {
  siteConfig: SiteConfig;
}

export function ContactForm({ siteConfig }: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    };

    try {
      const res = await fetch("/api/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-narrow">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="mb-6 text-2xl font-bold text-navy">Get in Touch</h2>
            <div className="space-y-6">
              {[
                { icon: MapPin, label: "Address", value: siteConfig.contact.address },
                { icon: Phone, label: "Phone", value: siteConfig.contact.phone },
                { icon: Mail, label: "Email", value: siteConfig.contact.email },
                { icon: Clock, label: "Hours", value: siteConfig.contact.hours },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mint-primary/10 text-mint-primary">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-muted">{item.label}</div>
                    <div className="font-medium text-navy">
                      {item.label === "Email" ? (
                        <a
                          href={`mailto:${item.value}`}
                          className="text-mint-primary hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        item.value
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-gray-100 bg-surface p-8"
            >
              <h2 className="mb-6 text-2xl font-bold text-navy">Send a Message</h2>

              {status === "success" && (
                <div className="mb-6 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-green-800">
                  <CheckCircle className="h-5 w-5" />
                  Message sent successfully. We&apos;ll get back to you soon.
                </div>
              )}

              {status === "error" && (
                <div className="mb-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-red-800">
                  <AlertCircle className="h-5 w-5" />
                  {error}
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-navy">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-navy transition focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 focus:outline-none"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-navy transition focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 focus:outline-none"
                    placeholder="you@example.com"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-navy">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-navy transition focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 focus:outline-none"
                  >
                    <option>General Inquiry</option>
                    <option>Program Application Question</option>
                    <option>Partnership Opportunity</option>
                    <option>Media & Press</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-navy">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-navy transition focus:border-mint-primary focus:ring-2 focus:ring-mint-primary/20 focus:outline-none"
                    placeholder="How can we help?"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="mt-6 w-full rounded-xl bg-mint-primary px-6 py-4 font-semibold text-white transition hover:bg-mint-primary-dark disabled:opacity-60 sm:w-auto"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
