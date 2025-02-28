import { cleanEmptyParams } from "@/lib/utils";
import type { RestaurantSearchParams } from "@/types/restaurant-types";
import {
  getRouteApi, type RegisteredRouter, type RouteIds, useNavigate,
} from "@tanstack/react-router";

export function useFilters<T extends RouteIds<RegisteredRouter["routeTree"]>>(
  routeId: T
) {
  const routeApi = getRouteApi<T>(routeId);
  const navigate = useNavigate();
  const filters = routeApi.useSearch();

  const setFilters = (partialFilters: Partial<RestaurantSearchParams>) => {
    const updatedFilters = { ...filters, ...partialFilters };
    const cleanedFilters = cleanEmptyParams(updatedFilters);
    navigate({ search: cleanedFilters });
  };

  const resetFilters = () => navigate({ search: {} });

  return { filters, setFilters, resetFilters };
}
