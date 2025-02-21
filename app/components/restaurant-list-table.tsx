import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { Restaurant } from "@/types/restaurant-types";
import { Link } from "@tanstack/react-router";
import { MapPinIcon } from "lucide-react";

interface RestaurantTableProps {
  restaurants: Restaurant[];
}

export default function RestaurantTable({ restaurants }: RestaurantTableProps) {
  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Restaurant Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Cuisine</TableHead>
            <TableHead className="text-center">Grade</TableHead>
            <TableHead className="text-center">Score</TableHead>
            <TableHead className="text-right">Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {restaurants.map((restaurant, index) => {
            return (
              <TableRow key={`${index}-${restaurant.camis}-${restaurant.dba}`}>
                <TableCell className="font-medium">{restaurant.dba}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                    <span>
                      {restaurant.building} {restaurant.street},{" "}
                      {restaurant.boro}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{restaurant.cuisine_description}</TableCell>
                <TableCell className="text-center">
                  {restaurant.inspections[0].grade}
                </TableCell>
                <TableCell className="text-center">
                  {restaurant.inspections[0].score}
                </TableCell>
                <TableCell className="text-right">
                  <Link
                    to="/restaurants/$camis"
                    params={{
                      camis: String(restaurant.camis),
                    }}
                  >
                    View Details
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
