"use client";

import { Trash2, Mail, ExternalLink } from "lucide-react";
import type { ApplicationSubmission, ContactSubmission, Program } from "@/lib/types";

interface ApplicantsPanelProps {
  applications: ApplicationSubmission[];
  contact: ContactSubmission[];
  programs: Program[];
  onDelete: (type: "contact" | "application", id: string) => void;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ApplicantsPanel({
  applications,
  contact,
  programs,
  onDelete,
}: ApplicantsPanelProps) {
  const programCounts = programs.map((program) => ({
    ...program,
    count: applications.filter((a) => a.program === program.title).length,
  }));

  const unassigned = applications.filter(
    (a) => !programs.some((p) => p.title === a.program)
  ).length;

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-navy">Applicants</h1>
      <p className="mb-8 text-slate-muted">
        All startup applications and contact messages from the website.
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-navy">Programs overview</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {programCounts.map((program) => (
            <div
              key={program.id}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="text-2xl font-bold text-mint-primary">{program.count}</div>
              <div className="mt-1 font-semibold text-navy">{program.title}</div>
              <div className="mt-1 text-xs text-slate-muted">{program.duration}</div>
            </div>
          ))}
          {unassigned > 0 && (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <div className="text-2xl font-bold text-amber-700">{unassigned}</div>
              <div className="mt-1 font-semibold text-navy">Other / Unlisted</div>
            </div>
          )}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-navy">
          Applications ({applications.length})
        </h2>

        {applications.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-slate-muted">
            No applications yet. They will appear here when founders submit the apply form.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full min-w-[960px] text-left text-sm">
              <thead className="border-b border-gray-100 bg-surface text-xs font-semibold tracking-wide text-slate-muted uppercase">
                <tr>
                  <th className="px-4 py-3">Submitted</th>
                  <th className="px-4 py-3">Founder</th>
                  <th className="px-4 py-3">Startup</th>
                  <th className="px-4 py-3">Program</th>
                  <th className="px-4 py-3">Sector</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Website</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <ApplicantRow key={app.id} app={app} onDelete={onDelete} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-navy">
          Contact messages ({contact.length})
        </h2>
        <div className="space-y-4">
          {contact.map((msg) => (
            <div key={msg.id} className="rounded-2xl border border-gray-200 bg-white p-6">
              <div className="mb-3 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-navy">{msg.subject}</h3>
                  <p className="mt-1 text-sm text-slate-muted">
                    {msg.name} · {msg.email} · {formatDate(msg.createdAt)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onDelete("contact", msg.id)}
                  className="shrink-0 rounded-lg p-2 text-red-500 hover:bg-red-50"
                  aria-label="Delete message"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm leading-relaxed text-navy/80">{msg.message}</p>
            </div>
          ))}
          {contact.length === 0 && (
            <p className="text-sm text-slate-muted">No contact messages yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function ApplicantRow({
  app,
  onDelete,
}: {
  app: ApplicationSubmission;
  onDelete: (type: "contact" | "application", id: string) => void;
}) {
  return (
    <>
      <tr className="border-b border-gray-50 align-top hover:bg-surface/60">
        <td className="px-4 py-4 whitespace-nowrap text-slate-muted">
          {formatDate(app.createdAt)}
        </td>
        <td className="px-4 py-4 font-medium text-navy">{app.founderName}</td>
        <td className="px-4 py-4 font-medium text-navy">{app.startupName}</td>
        <td className="px-4 py-4">
          <span className="rounded-full bg-mint-primary/10 px-2.5 py-1 text-xs font-medium text-mint-primary">
            {app.program || "—"}
          </span>
        </td>
        <td className="px-4 py-4 text-navy/80">{app.sector}</td>
        <td className="px-4 py-4 text-navy/80">{app.stage}</td>
        <td className="px-4 py-4">
          <a
            href={`mailto:${app.email}`}
            className="inline-flex items-center gap-1 text-mint-primary hover:underline"
          >
            <Mail className="h-3.5 w-3.5" />
            {app.email}
          </a>
        </td>
        <td className="px-4 py-4">
          {app.website ? (
            <a
              href={app.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-mint-primary hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Link
            </a>
          ) : (
            <span className="text-slate-muted">—</span>
          )}
        </td>
        <td className="px-4 py-4 text-right">
          <button
            type="button"
            onClick={() => onDelete("application", app.id)}
            className="rounded-lg p-2 text-red-500 hover:bg-red-50"
            aria-label="Delete application"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </td>
      </tr>
      <tr className="border-b border-gray-100 bg-surface/40">
        <td colSpan={9} className="px-4 py-3">
          <p className="text-xs font-semibold tracking-wide text-slate-muted uppercase">
            Pitch / Description
          </p>
          <p className="mt-1 text-sm leading-relaxed text-navy/80">{app.pitch}</p>
        </td>
      </tr>
    </>
  );
}
