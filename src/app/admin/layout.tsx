import type { Metadata } from "next";
import { SidebarProvider } from "@/context/SidebarContext";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | Wayfarly Admin",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <AdminShell>
        <AdminNavbar />
        <div style={{ padding: "1.6rem" }}>{children}</div>
      </AdminShell>
    </SidebarProvider>
  );
}
