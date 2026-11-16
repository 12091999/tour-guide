import { AdminNavShell } from "@/components/admin/sidebar-nav"

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return <AdminNavShell>{children}</AdminNavShell>
}
