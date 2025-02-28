import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_rootLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="tanstack-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <div className="flex flex-col h-full container mx-auto">
          <div className="flex items-center gap-2 py-2">
            <SidebarTrigger size="lg" />
          </div>
          <Outlet />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
}
