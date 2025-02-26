import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/restaurants")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex-1">
      <Outlet />
    </main>
  );
}
