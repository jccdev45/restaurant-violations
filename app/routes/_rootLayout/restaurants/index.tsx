import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { restaurantSearchSchema } from "@/schema/restaurantSchema";
import { restaurantsQueryOptions } from "@/utils/restaurants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useMemo } from "react";

export const Route = createFileRoute("/_rootLayout/restaurants/")({
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(restaurantsQueryOptions(deps));
  },
  validateSearch: zodValidator(restaurantSearchSchema),
  // search: {
  //   middlewares: [retainSearchParams(["restaurantsView"])],
  // },
  component: RouteComponent,
});

function RouteComponent() {
  const search = Route.useSearch();
  console.log("🚀 ~ RouteComponent ~ search:", search);
  const {
    data: { restaurants },
  } = useSuspenseQuery(restaurantsQueryOptions(Route.useLoaderDeps()));
  const order = search?.$order ?? "inspection_date DESC";
  const offset = search?.$offset ?? 0;

  const sortedRestaurants = useMemo(() => {
    if (!restaurants) return [];

    return !order
      ? restaurants
      : [...restaurants].sort((a, b) => {
          const [columnA, directionA] = order.split(" ");
          const [columnB, directionB] = "inspection_date DESC".split(" ");

          const valueA =
            a.inspections[0][columnA as keyof (typeof a.inspections)[0]];
          const valueB =
            b.inspections[0][columnB as keyof (typeof b.inspections)[0]];

          if (valueA === undefined || valueB === undefined) {
            return 0; // Handle cases where values might be undefined
          }

          if (valueA < valueB) {
            return directionA === "ASC" ? -1 : 1;
          }
          if (valueA > valueB) {
            return directionA === "ASC" ? 1 : -1;
          }

          return 0;
        });
  }, [restaurants, order]);

  // const filteredRestaurants = useMemo(() => {}, [sortedRestaurants, order])

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={sortedRestaurants} />
    </div>
  );
}
