import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import { useFilters } from "@/hooks/use-filters";
import { DEFAULT_PAGE_SIZE } from "@/lib/utils";
import { restaurantSearchSchema } from "@/schema/restaurantSchema";
import type { RestaurantListResponse } from "@/types/restaurant-types";
import { fetchRestaurants, restaurantsQueryOptions } from "@/utils/restaurants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useState } from "react";

export const Route = createFileRoute("/_rootLayout/restaurants/")({
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(restaurantsQueryOptions(deps));
  },
  validateSearch: zodValidator(restaurantSearchSchema),
  component: RouteComponent,
});

function RouteComponent() {
  const loaderDeps = Route.useLoaderDeps();
  const { filters, setFilters } = useFilters("/_rootLayout/restaurants/");
  const { data, isLoading } = useSuspenseQuery({
    queryKey: restaurantsQueryOptions(loaderDeps).queryKey,
    queryFn: () => fetchRestaurants({ data: filters }),
    select: (data: RestaurantListResponse) => ({
      restaurants: data.restaurants,
      totalCount: data.totalCount,
    }),
  });

  const [pageSize, setPageSize] = useState(filters.$limit ?? DEFAULT_PAGE_SIZE);
  const [pageIndex, setPageIndex] = useState(filters.$offset ?? 0);

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
    setFilters({ $offset: newPageIndex * pageSize, $limit: pageSize });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setFilters({ $limit: newPageSize, $offset: 0 });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto">
      <DataTable
        columns={columns}
        data={data.restaurants}
        totalCount={data?.totalCount ?? 0}
        pageSize={pageSize}
        pageIndex={pageIndex}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}
