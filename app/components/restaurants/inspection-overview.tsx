import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FullInspectionData } from "@/types/restaurant-types";
import { Calendar } from "lucide-react";

interface InspectionOverviewProps {
  inspections: FullInspectionData[];
}

export function InspectionOverview({ inspections }: InspectionOverviewProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Inspection History</h3>
      {inspections.map((inspection) => (
        <Card
          key={`${inspection.inspection_date}-${inspection.score}`}
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
