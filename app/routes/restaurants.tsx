import { useId } from "react";

import { restaurantsQueryOptions } from "@/utils/restaurants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/restaurants")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(restaurantsQueryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const restaurantsQuery = useSuspenseQuery(restaurantsQueryOptions());

  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {[
          ...restaurantsQuery.data,
          { id: "i-do-not-exist", name: "Non-existent User", email: "" },
        ].map((restaurant) => {
          const id = useId();

          return (
            <li key={`${id}-${restaurant.dba}`} className="whitespace-nowrap">
              <Link
                to="/restaurants/$restaurantId"
                params={{
                  restaurantId: String(restaurant.camis),
                }}
                className="block py-1 text-blue-800 hover:text-blue-600"
                activeProps={{ className: "text-black font-bold" }}
              >
                <div>{restaurant.dba}</div>
              </Link>
            </li>
          );
        })}
      </ul>
      <hr />
      <Outlet />
    </div>
  );
}
