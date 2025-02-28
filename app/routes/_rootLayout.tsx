import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Search } from "lucide-react";

export const Route = createFileRoute("/_rootLayout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="tanstack-ui-theme">
      <SidebarProvider>
        <aside>
          <AppSidebar />
        </aside>
        <main className="flex flex-col h-full container mx-auto">
          <header className="flex items-center gap-2 py-2">
            <SidebarTrigger size="lg" />
            <div className="flex w-full max-w-sm items-center space-x-2 mx-auto">
              <Input type="search" placeholder="Search restaurants..." />
              <Button type="submit" size="icon">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
          </header>
          <Outlet />
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
