import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Restaurant } from "@/types/restaurant-types";
import { MapPin, Phone, Utensils } from "lucide-react";

interface RestaurantDetailsProps {
  restaurant: Restaurant;
}

export function RestaurantDetails({ restaurant }: RestaurantDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{restaurant.dba}</CardTitle>
        <CardDescription>CAMIS: {restaurant.camis}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{`${restaurant.building} ${restaurant.street}, ${restaurant.boro}, ${restaurant.zipcode ?? `N/A`}`}</span>
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
  );
}
