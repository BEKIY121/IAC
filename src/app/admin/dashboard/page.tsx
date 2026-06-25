import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const content = await getContent();
  return <AdminDashboard initialContent={content} />;
}
