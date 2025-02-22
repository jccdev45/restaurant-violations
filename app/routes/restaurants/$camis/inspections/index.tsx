import { InspectionOverview } from "@/components/restaurants/inspection-overview";
import { restaurantQueryOptions } from "@/utils/restaurants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/restaurants/$camis/inspections/")({
  loader: async ({ context, params: { camis } }) => {
    const { restaurant } = await context.queryClient.ensureQueryData(
      restaurantQueryOptions(camis)
    );
    return { restaurant };
  },
  component: InspectionListComponent,
});

function InspectionListComponent() {
  const { restaurant } = Route.useLoaderData();
  return <InspectionOverview inspections={restaurant.inspections} />;
}
