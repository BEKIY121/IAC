"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Rocket,
  GraduationCap,
  Newspaper,
  BookOpen,
  Briefcase,
  BarChart3,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  Inbox,
  Sparkles,
} from "lucide-react";
import { IacLogo } from "@/components/ui/Logo";
import { ApplicantsPanel } from "@/components/admin/ApplicantsPanel";
import type {
  SiteContent,
  ContentCollection,
} from "@/lib/types";
import { cn } from "@/lib/utils";

type AdminTab =
  | "overview"
  | ContentCollection
  | "settings"
  | "applicants";

const TABS: { id: AdminTab; label: string; icon: typeof Rocket }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "startups", label: "Startups", icon: Rocket },
  { id: "programs", label: "Programs", icon: GraduationCap },
  { id: "news", label: "News", icon: Newspaper },
  { id: "resources", label: "Resources", icon: BookOpen },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "stats", label: "Stats", icon: BarChart3 },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "capabilities", label: "Capabilities", icon: Sparkles },
  { id: "applicants", label: "Applicants", icon: Inbox },
  { id: "settings", label: "Settings", icon: Settings },
];

interface AdminDashboardProps {
  initialContent: SiteContent;
}

export function AdminDashboard({ initialContent }: AdminDashboardProps) {
  const router = useRouter();
  const [content, setContent] = useState(initialContent);
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const showMessage = useCallback((msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  }, []);

  async function refreshContent() {
    const res = await fetch("/api/admin/content/");
    if (res.ok) {
      setContent(await res.json());
      router.refresh();
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout/", { method: "POST" });
    router.push("/admin/login/");
    router.refresh();
  }

  async function saveCollectionItem(
    collection: ContentCollection,
    item: Record<string, unknown>,
    isCreate: boolean
  ) {
    setLoading(true);
    try {
      const processed = { ...item };
      if (collection === "programs" && typeof processed.features === "string") {
        processed.features = (processed.features as string)
          .split("\n")
          .map((f) => f.trim())
          .filter(Boolean);
      }

      const url = isCreate
        ? `/api/admin/${collection}/`
        : `/api/admin/${collection}/${item.id}/`;
      const res = await fetch(url, {
        method: isCreate ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(processed),
      });

      if (!res.ok) throw new Error("Save failed");
      await refreshContent();
      setEditing(null);
      setIsNew(false);
      showMessage(isCreate ? "Created successfully" : "Updated successfully");
    } catch {
      showMessage("Error saving item");
    } finally {
      setLoading(false);
    }
  }

  async function deleteCollectionItem(collection: ContentCollection, id: string) {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${collection}/${id}/`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await refreshContent();
      showMessage("Deleted successfully");
    } catch {
      showMessage("Error deleting item");
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings(siteConfig: SiteContent["siteConfig"]) {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/content/", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteConfig }),
      });
      if (!res.ok) throw new Error("Save failed");
      await refreshContent();
      showMessage("Settings saved");
    } catch {
      showMessage("Error saving settings");
    } finally {
      setLoading(false);
    }
  }

  async function deleteSubmission(type: "contact" | "application", id: string) {
    if (!confirm("Delete this submission?")) return;
    const res = await fetch(`/api/admin/submissions/?type=${type}&id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await refreshContent();
      showMessage("Submission deleted");
    }
  }

  const collection = activeTab !== "overview" &&
    activeTab !== "settings" &&
    activeTab !== "applicants"
      ? activeTab
      : null;

  const items = collection
    ? (content[collection] as unknown as Array<Record<string, unknown>>)
    : [];

  return (
    <div className="flex min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-200 bg-navy text-white">
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
          <IacLogo size="sm" onDark />
          <div>
            <div className="text-sm font-bold">Admin Panel</div>
            <div className="text-xs text-white/60">Content Manager</div>
          </div>
        </div>

        <nav className="space-y-1 p-4">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setEditing(null);
                setIsNew(false);
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                activeTab === tab.id
                  ? "bg-mint-primary text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
              {tab.id === "applicants" &&
                (content.contactSubmissions.length + content.applicationSubmissions.length) > 0 && (
                  <span className="ml-auto rounded-full bg-eth-gold px-2 py-0.5 text-xs font-bold text-navy">
                    {content.contactSubmissions.length + content.applicationSubmissions.length}
                  </span>
                )}
            </button>
          ))}
        </nav>

        <div className="absolute right-0 bottom-0 left-0 border-t border-white/10 p-4">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-4 w-4" />
            View Website
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition hover:bg-red-500/20 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="ml-64 flex-1 p-8">
        {message && (
          <div className="fixed top-4 right-4 z-50 rounded-xl bg-mint-primary px-4 py-3 text-sm font-medium text-white shadow-lg">
            {message}
          </div>
        )}

        {activeTab === "overview" && (
          <OverviewPanel content={content} onNavigate={setActiveTab} />
        )}

        {activeTab === "settings" && (
          <SettingsPanel
            siteConfig={content.siteConfig}
            onSave={saveSettings}
            loading={loading}
          />
        )}

        {activeTab === "applicants" && (
          <ApplicantsPanel
            applications={content.applicationSubmissions}
            contact={content.contactSubmissions}
            programs={content.programs}
            onDelete={deleteSubmission}
          />
        )}

        {collection && !editing && !isNew && (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-2xl font-bold capitalize text-navy">{collection}</h1>
              <button
                type="button"
                onClick={() => {
                  setIsNew(true);
                  setEditing(getEmptyItem(collection));
                }}
                className="flex items-center gap-2 rounded-xl bg-mint-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-mint-primary-dark"
              >
                <Plus className="h-4 w-4" />
                Add New
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-gray-100 bg-surface">
                  <tr>
                    <th className="px-6 py-3 font-semibold text-navy">Title / Name</th>
                    <th className="px-6 py-3 font-semibold text-navy">Details</th>
                    <th className="px-6 py-3 text-right font-semibold text-navy">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={String(item.id)} className="border-b border-gray-50 hover:bg-surface/50">
                      <td className="px-6 py-4 font-medium text-navy">
                        {String(item.title || item.name || item.value || item.author || item.year || item.id)}
                      </td>
                      <td className="max-w-md truncate px-6 py-4 text-slate-muted">
                        {String(item.description || item.excerpt || item.quote || item.label || item.event || "").slice(0, 80)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            const itemCopy = { ...item };
                            if (collection === "programs" && Array.isArray(itemCopy.features)) {
                              itemCopy.features = (itemCopy.features as string[]).join("\n");
                            }
                            setEditing(itemCopy);
                            setIsNew(false);
                          }}
                          className="mr-2 rounded-lg p-2 text-mint-primary transition hover:bg-mint-primary/10"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteCollectionItem(collection, String(item.id))}
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-6 py-12 text-center text-slate-muted">
                        No items yet. Click &quot;Add New&quot; to create one.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {collection && (editing || isNew) && (
          <ItemEditor
            collection={collection}
            item={editing!}
            isNew={isNew}
            loading={loading}
            onSave={(item) => saveCollectionItem(collection, item, isNew)}
            onCancel={() => {
              setEditing(null);
              setIsNew(false);
            }}
          />
        )}
      </main>
    </div>
  );
}

function OverviewPanel({
  content,
  onNavigate,
}: {
  content: SiteContent;
  onNavigate: (tab: AdminTab) => void;
}) {
  const cards = [
    { label: "Startups", count: content.startups.length, tab: "startups" as AdminTab },
    { label: "Programs", count: content.programs.length, tab: "programs" as AdminTab },
    { label: "News", count: content.news.length, tab: "news" as AdminTab },
    { label: "Applicants", count: content.applicationSubmissions.length, tab: "applicants" as AdminTab },
  ];

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-navy">Dashboard</h1>
      <p className="mb-8 text-slate-muted">Manage IAC website content and submissions</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <button
            key={card.label}
            type="button"
            onClick={() => onNavigate(card.tab)}
            className="rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition hover:border-mint-primary/30 hover:shadow-md"
          >
            <div className="text-3xl font-bold text-mint-primary">{card.count}</div>
            <div className="mt-1 font-medium text-navy">{card.label}</div>
          </button>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-navy">Recent applicants</h2>
          <button
            type="button"
            onClick={() => onNavigate("applicants")}
            className="text-sm font-medium text-mint-primary hover:underline"
          >
            View all
          </button>
        </div>
        {content.applicationSubmissions.length === 0 ? (
          <p className="text-sm text-slate-muted">No applications yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-xs text-slate-muted uppercase">
                  <th className="pb-2 pr-4">Startup</th>
                  <th className="pb-2 pr-4">Founder</th>
                  <th className="pb-2 pr-4">Program</th>
                  <th className="pb-2">Sector</th>
                </tr>
              </thead>
              <tbody>
                {content.applicationSubmissions.slice(0, 5).map((app) => (
                  <tr key={app.id} className="border-b border-gray-50">
                    <td className="py-2.5 pr-4 font-medium text-navy">{app.startupName}</td>
                    <td className="py-2.5 pr-4 text-navy/80">{app.founderName}</td>
                    <td className="py-2.5 pr-4 text-mint-primary">{app.program}</td>
                    <td className="py-2.5 text-navy/80">{app.sector}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6">
        <h2 className="mb-4 font-bold text-navy">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: "Add Startup", tab: "startups" as AdminTab },
            { label: "Post News", tab: "news" as AdminTab },
            { label: "Add Program", tab: "programs" as AdminTab },
            { label: "View Applicants", tab: "applicants" as AdminTab },
          ].map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => onNavigate(action.tab)}
              className="rounded-xl border border-mint-primary/30 px-4 py-2 text-sm font-medium text-mint-primary transition hover:bg-mint-primary/5"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SettingsPanel({
  siteConfig,
  onSave,
  loading,
}: {
  siteConfig: SiteContent["siteConfig"];
  onSave: (config: SiteContent["siteConfig"]) => void;
  loading: boolean;
}) {
  const [form, setForm] = useState(siteConfig);

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-navy">Site Settings</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(form);
        }}
        className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6"
      >
        {[
          { key: "name", label: "Site Name", section: "main" },
          { key: "fullName", label: "Full Name", section: "main" },
          { key: "tagline", label: "Tagline", section: "main" },
          { key: "description", label: "Description", section: "main", textarea: true },
          { key: "url", label: "Website URL", section: "main" },
          { key: "email", label: "Contact Email", section: "contact" },
          { key: "phone", label: "Phone", section: "contact" },
          { key: "address", label: "Address", section: "contact" },
          { key: "hours", label: "Business Hours", section: "contact" },
        ].map((field) => (
          <div key={field.key}>
            <label className="mb-1.5 block text-sm font-medium text-navy">{field.label}</label>
            {field.textarea ? (
              <textarea
                rows={3}
                value={
                  field.section === "main"
                    ? (form[field.key as keyof typeof form] as string)
                    : form.contact[field.key as keyof typeof form.contact]
                }
                onChange={(e) => {
                  if (field.section === "contact") {
                    setForm({ ...form, contact: { ...form.contact, [field.key]: e.target.value } });
                  } else {
                    setForm({ ...form, [field.key]: e.target.value });
                  }
                }}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-mint-primary focus:outline-none"
              />
            ) : (
              <input
                type="text"
                value={
                  field.section === "main"
                    ? (form[field.key as keyof typeof form] as string)
                    : form.contact[field.key as keyof typeof form.contact]
                }
                onChange={(e) => {
                  if (field.section === "contact") {
                    setForm({ ...form, contact: { ...form.contact, [field.key]: e.target.value } });
                  } else {
                    setForm({ ...form, [field.key]: e.target.value });
                  }
                }}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-mint-primary focus:outline-none"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-mint-primary px-6 py-3 font-semibold text-white hover:bg-mint-primary-dark disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}

function ItemEditor({
  collection,
  item,
  isNew,
  loading,
  onSave,
  onCancel,
}: {
  collection: ContentCollection;
  item: Record<string, unknown>;
  isNew: boolean;
  loading: boolean;
  onSave: (item: Record<string, unknown>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(item);

  const fields = getFieldsForCollection(collection);

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-navy">
        {isNew ? "Add" : "Edit"} {collection.slice(0, -1)}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave(form);
        }}
        className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6"
      >
        {fields.map((field) => (
          <div key={field.key}>
            <label className="mb-1.5 block text-sm font-medium text-navy">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                rows={field.key === "features" ? 5 : 3}
                value={
                  field.key === "features" && Array.isArray(form[field.key])
                    ? (form[field.key] as string[]).join("\n")
                    : String(form[field.key] ?? "")
                }
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                placeholder={field.key === "features" ? "One feature per line" : undefined}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-mint-primary focus:outline-none"
              />
            ) : field.type === "checkbox" ? (
              <input
                type="checkbox"
                checked={Boolean(form[field.key])}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-mint-primary"
              />
            ) : field.type === "number" ? (
              <input
                type="number"
                value={Number(form[field.key] ?? 0)}
                onChange={(e) => setForm({ ...form, [field.key]: Number(e.target.value) })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-mint-primary focus:outline-none"
              />
            ) : (
              <input
                type="text"
                value={String(form[field.key] ?? "")}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:border-mint-primary focus:outline-none"
              />
            )}
          </div>
        ))}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-mint-primary px-6 py-3 font-semibold text-white hover:bg-mint-primary-dark disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-gray-200 px-6 py-3 font-medium text-navy hover:bg-surface"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

function getFieldsForCollection(collection: ContentCollection) {
  const common = {
    startups: [
      { key: "name", label: "Name", type: "text" },
      { key: "sector", label: "Sector", type: "text" },
      { key: "stage", label: "Stage (Early/Growth/Scale)", type: "text" },
      { key: "year", label: "Cohort Year", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "website", label: "Website URL", type: "text" },
    ],
    programs: [
      { key: "id", label: "Slug ID", type: "text" },
      { key: "title", label: "Title", type: "text" },
      { key: "duration", label: "Duration", type: "text" },
      { key: "badge", label: "Badge", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "features", label: "Features (one per line)", type: "textarea" },
      { key: "featured", label: "Featured Program", type: "checkbox" },
    ],
    news: [
      { key: "title", label: "Title", type: "text" },
      { key: "excerpt", label: "Excerpt", type: "textarea" },
      { key: "date", label: "Date", type: "text" },
      { key: "category", label: "Category", type: "text" },
      { key: "published", label: "Published", type: "checkbox" },
    ],
    resources: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "type", label: "Type (Download/Guide/Video/Directory/Report)", type: "text" },
      { key: "url", label: "URL (optional)", type: "text" },
    ],
    services: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "icon", label: "Icon (trending-up/scale/calculator/code/user-plus/megaphone)", type: "text" },
    ],
    stats: [
      { key: "value", label: "Value", type: "text" },
      { key: "label", label: "Label", type: "text" },
    ],
    testimonials: [
      { key: "quote", label: "Quote", type: "textarea" },
      { key: "author", label: "Author", type: "text" },
      { key: "role", label: "Role", type: "text" },
      { key: "initials", label: "Initials", type: "text" },
    ],
    capabilities: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "icon", label: "Icon (lightbulb/users/building/wallet/globe/cpu)", type: "text" },
    ],
    values: [
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
    timeline: [
      { key: "year", label: "Year", type: "text" },
      { key: "event", label: "Event", type: "textarea" },
    ],
    applicationSteps: [
      { key: "step", label: "Step Number", type: "number" },
      { key: "title", label: "Title", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
    ],
  };

  return common[collection] || [{ key: "title", label: "Title", type: "text" }];
}

function getEmptyItem(collection: ContentCollection): Record<string, unknown> {
  const base: Record<string, unknown> = { id: crypto.randomUUID() };

  switch (collection) {
    case "programs":
      return { ...base, id: "", title: "", duration: "", badge: "", description: "", features: "", featured: false };
    case "startups":
      return { ...base, name: "", sector: "", stage: "Early", year: new Date().getFullYear().toString(), description: "" };
    case "news":
      return { ...base, title: "", excerpt: "", date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }), category: "Announcement", published: true };
    case "stats":
      return { ...base, value: "", label: "" };
    case "applicationSteps":
      return { ...base, step: 1, title: "", description: "" };
    default:
      return { ...base, title: "", description: "" };
  }
}
