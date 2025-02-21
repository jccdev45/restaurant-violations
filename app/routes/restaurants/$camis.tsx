import { Calendar, MapPin, Phone, Utensils } from "lucide-react";

import { RestaurantErrorComponent } from "@/components/error/restaurant-catch-boundary";
import { NotFound } from "@/components/not-found";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { restaurantQueryOptions } from "@/utils/restaurants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/restaurants/$camis")({
  loader: async ({ context, params: { camis } }) => {
    await context.queryClient.ensureQueryData(restaurantQueryOptions(camis));
  },
  errorComponent: RestaurantErrorComponent,
  component: RestaurantComponent,
  notFoundComponent: () => {
    // TODO: Create themed restaurant not found component
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
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{restaurant.dba}</CardTitle>
          <CardDescription>CAMIS: {restaurant.camis}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center">
              <MapPin className="mr-2 h-4 w-4" />
              <span>{`${restaurant.building} ${restaurant.street}, ${restaurant.boro}, ${restaurant.zipcode}`}</span>
            </div>
            {restaurant.phone && (
              <div className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                <span>{restaurant.phone}</span>
              </div>
            )}
            {restaurant.cuisine_description && (
              <div className="flex items-center">
                <Utensils className="mr-2 h-4 w-4" />
                <span>{restaurant.cuisine_description}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <h3 className="text-xl font-semibold mt-6 mb-4">Inspection History</h3>
      {restaurant.inspections.map((inspection) => (
        <Card
          key={`${inspection.inspection_date}-${restaurant.camis}`}
          className="mb-4"
        >
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              {new Date(inspection.inspection_date).toLocaleDateString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Grade:</strong> {inspection.grade || "N/A"}
              </p>
              <p>
                <strong>Score:</strong> {inspection.score || "N/A"}
              </p>
              <p>
                <strong>Action:</strong> {inspection.action || "N/A"}
              </p>
              <p>
                <strong>Critical Flag:</strong> {inspection.critical_flag}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
