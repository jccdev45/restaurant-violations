// /restaurants/$camis/index.tsx
import { RestaurantErrorComponent } from "@/components/error/restaurant-catch-boundary";
import { NotFound } from "@/components/not-found";
import { InspectionOverview } from "@/components/restaurants/inspection-overview";
import { RestaurantDetails } from "@/components/restaurants/restaurant-details";
import { restaurantQueryOptions } from "@/utils/restaurants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_rootLayout/restaurants/$camis/")({
  loader: async ({ context, params: { camis } }) => {
    await context.queryClient.ensureQueryData(restaurantQueryOptions(camis));
  },
  errorComponent: RestaurantErrorComponent,
  component: RestaurantComponent,
  notFoundComponent: () => {
    return <NotFound>Restaurant not found</NotFound>;
  },
});

function RestaurantComponent() {
  const params = Route.useParams();
  const {
    data: { restaurant },
  } = useSuspenseQuery(restaurantQueryOptions(params.camis));

  return (
    <div className="space-y-6 p-4">
      <RestaurantDetails restaurant={restaurant} />
      <InspectionOverview inspections={restaurant.inspections} />
    </div>
  );
}
