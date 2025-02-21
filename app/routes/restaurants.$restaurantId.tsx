import { useId } from "react";

import { RestaurantErrorComponent } from "@/components/error/restaurant-catch-boundary";
import { NotFound } from "@/components/not-found";
import { restaurantQueryOptions } from "@/utils/restaurants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/restaurants/$restaurantId")({
  loader: async ({ context, params: { restaurantId } }) => {
    await context.queryClient.ensureQueryData(
      restaurantQueryOptions(restaurantId)
    );
  },
  errorComponent: RestaurantErrorComponent,
  component: RestaurantComponent,
  notFoundComponent: () => {
    return <NotFound>Restaurant not found</NotFound>;
  },
});

function RestaurantComponent() {
  const params = Route.useParams();
  const restaurantQuery = useSuspenseQuery(
    restaurantQueryOptions(params.restaurantId)
  );
  const restaurant = restaurantQuery.data;

  return (
    <div className="space-y-2">
      {restaurant.map((rest) => {
        const id = useId();

        return (
          <div key={`${id}-${rest.camis}`}>
            <h4 className="text-xl font-bold underline">{rest.dba}</h4>
            <div className="text-sm">{rest.camis}</div>
          </div>
        );
      })}
    </div>
  );
}
