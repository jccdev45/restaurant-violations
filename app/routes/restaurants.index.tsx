import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/restaurants/")({
  component: RestaurantsIndexComponent,
});

function RestaurantsIndexComponent() {
  return <div>Select a post.</div>;
}
