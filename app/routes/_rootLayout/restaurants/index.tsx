import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { restaurantSearchSchema } from "@/schema/restaurantSchema";
import { restaurantsQueryOptions } from "@/utils/restaurants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

export const Route = createFileRoute("/_rootLayout/restaurants/")({
  loaderDeps: (opt) => ({
    ...opt.search,
    $order: opt.search?.$order ?? "inspection_date DESC",
  }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(restaurantsQueryOptions(deps));
  },
  validateSearch: zodValidator(restaurantSearchSchema),
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data: { restaurants },
  } = useSuspenseQuery(restaurantsQueryOptions(Route.useLoaderDeps()));

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={restaurants} />
    </div>
  );
}
