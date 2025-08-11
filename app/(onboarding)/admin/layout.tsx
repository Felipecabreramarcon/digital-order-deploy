import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./_components/adminSidebar";
import { getServerSession, User } from "next-auth";
import { authOptions } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <SidebarProvider defaultOpen>
      <AdminSidebar user={session.user as User} />
      <main className="w-full overflow-x-auto p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
