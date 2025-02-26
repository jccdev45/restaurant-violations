// src/routes/restaurants/$camis/inspections/$inspectionId/index.tsx
import { InspectionDetails } from "@/components/restaurants/inspection-details";
import { restaurantQueryOptions } from "@/utils/restaurants";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/restaurants/$camis/inspections/$inspectionId/"
)({
  loader: async ({ context, params: { camis, inspectionId } }) => {
    const { restaurant } = await context.queryClient.ensureQueryData(
      restaurantQueryOptions(camis)
    );

    const inspection = restaurant.inspections.find(
      (insp: { inspectionId: string }) => insp.inspectionId === inspectionId
    );

    if (!inspection) {
      console.error(
        "Inspection not found. Inspections:",
        restaurant.inspections
      );
      throw new Error("Inspection not found");
    }

    return { restaurant, inspection };
  },
  component: InspectionDetailsComponent,
});

function InspectionDetailsComponent() {
  const { restaurant, inspection } = Route.useLoaderData();
  return <InspectionDetails restaurant={restaurant} inspection={inspection} />;
}
