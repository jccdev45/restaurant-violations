import { columns } from "@/components/restaurants/columns";
import { DataTable } from "@/components/restaurants/data-table";
import { restaurantsQueryOptions } from "@/utils/restaurants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/restaurants/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(restaurantsQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data: { restaurants },
  } = useSuspenseQuery(restaurantsQueryOptions());

  return (
    <div className="p-2 flex gap-2">
      <DataTable columns={columns} data={restaurants} />
      <hr />
      <Outlet />
    </div>
  );
}
