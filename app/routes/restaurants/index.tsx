import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { TooltipProvider } from "@/components/ui/tooltip";
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
    <div className="p-2 flex gap-2 flex-1 h-full">
      <TooltipProvider>
        <DataTable columns={columns} data={restaurants} />
      </TooltipProvider>
      <hr />
      <Outlet />
    </div>
  );
}
