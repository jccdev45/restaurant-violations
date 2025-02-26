import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/restaurants/chart")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/restaurants/chart/"!</div>;
}
