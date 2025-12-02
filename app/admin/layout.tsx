import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Session check removed - handled by middleware.ts
  // This allows /admin/login to render without redirect loop
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
