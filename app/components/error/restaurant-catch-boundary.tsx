import { ErrorComponent } from "@tanstack/react-router";

import type { ErrorComponentProps } from "@tanstack/react-router";

export function RestaurantErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}
