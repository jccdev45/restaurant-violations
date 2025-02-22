// src/components/restaurants/inspection-details.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { FullInspectionData, Restaurant } from "@/types/restaurant-types";
import { MapPin, Phone, Utensils } from "lucide-react";

interface InspectionDetailsProps {
  restaurant: Restaurant;
  inspection: FullInspectionData;
}

export function InspectionDetails({
  restaurant,
  inspection,
}: InspectionDetailsProps) {
  return (
    <div className="space-y-6 p-4">
      {/* Restaurant Details */}
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

      {/* Inspection Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Inspection Details
          </CardTitle>
          <CardDescription>
            {new Date(inspection.inspection_date).toLocaleDateString()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <strong>Grade:</strong> {inspection.grade || "N/A"}
            </div>
            <div>
              <strong>Score:</strong> {inspection.score || "N/A"}
            </div>
            <div>
              <strong>Action:</strong> {inspection.action || "N/A"}
            </div>
            <div>
              <strong>Critical Flag:</strong> {inspection.critical_flag}
            </div>
            <div>
              <strong>Inspection Type:</strong>{" "}
              {inspection.inspection_type || "N/A"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Violations */}
      {inspection.violations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Violations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {inspection.violations.map((violation, index) => (
                <div key={index} className="space-y-2">
                  <div>
                    <strong>Code:</strong> {violation.violation_code}
                  </div>
                  <div>
                    <strong>Description:</strong>{" "}
                    {violation.violation_description}
                  </div>
                  <div>
                    <strong>Critical Flag:</strong> {violation.critical_flag}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
