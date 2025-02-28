import { SidebarInset } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_rootLayout/restaurants")({
  component: RouteComponent,
});

function RouteComponent() {
  // const location = useLocation();
  // const path = cleanPath(location.pathname);

  return (
    <main className="flex-1">
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </main>
  );
}
