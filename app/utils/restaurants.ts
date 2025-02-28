import { generateInspectionId, isRedaxiosError } from "@/lib/utils";
import type {
  FullInspectionData, Restaurant, RestaurantListResponse,
  RestaurantSearchParams, Violation,
} from "@/types/restaurant-types";
import { queryOptions } from "@tanstack/react-query";
import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import axios from "redaxios";

const BASE_URL = "https://data.cityofnewyork.us/resource/43nn-pn8j.json";

const DEFAULT_PARAMS: Partial<RestaurantSearchParams> = {
  $order: "inspection_date DESC", // Default $order as a string
  $limit: 5000,
  $offset: 0,
};

function transformRestaurantData(data: any[]): Restaurant[] {
  const restaurantsMap = data.reduce<Record<string, Restaurant>>(
    (acc, item) => {
      if (!acc[item.camis]) {
        acc[item.camis] = {
          camis: item.camis,
          dba: item.dba,
          boro: item.boro,
          building: item.building,
          street: item.street,
          zipcode: item.zipcode,
          phone: item.phone,
          cuisine_description: item.cuisine_description,
          latitude: item.latitude,
          longitude: item.longitude,
          community_board: item.community_board,
          council_district: item.council_district,
          census_tract: item.census_tract,
          bin: item.bin,
          bbl: item.bbl,
          nta: item.nta,
          inspections: [],
        };
      }

      if (item.inspection_date !== "1900-01-01T00:00:00.000") {
        const violation: Violation = {
          violation_code: item.violation_code,
          violation_description: item.violation_description,
          critical_flag: item.critical_flag,
        };

        // Find an existing inspection with the same date
        const existingInspection = acc[item.camis].inspections.find(
          (insp) => insp.inspection_date === item.inspection_date
        );

        if (existingInspection) {
          // If an inspection with the same date exists, add the violation to it
          existingInspection.violations.push(violation);
        } else {
          // Otherwise, create a new inspection
          const inspection: FullInspectionData = {
            inspectionId: generateInspectionId(
              item.camis,
              item.inspection_date
            ),
            inspection_date: item.inspection_date,
            action: item.action,
            critical_flag: item.critical_flag,
            score: item.score,
            grade: item.grade,
            grade_date: item.grade_date,
            inspection_type: item.inspection_type,
            violations: [violation],
          };

          acc[item.camis].inspections.push(inspection);
        }
      }

      return acc;
    },
    {}
  );

  return Object.values(restaurantsMap);
}

const fetchData = async <T>({
  params,
  camis,
}: {
  params?: RestaurantSearchParams;
  camis?: string;
}): Promise<T> => {
  //Merge default params with provided params, overwriting defaults if needed.
  const mergedParams: Partial<RestaurantSearchParams> = {
    ...DEFAULT_PARAMS,
    ...params,
  };
  console.log("🚀 ~ mergedParams:", mergedParams);

  try {
    const response = await axios.get<T>(BASE_URL, {
      headers: {
        Accept: "application/json",
        "X-App-Token": process.env.RESTAURANT_API_APP_TOKEN!,
      },
      params: camis ? { camis } : mergedParams,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    if (isRedaxiosError(error) && error.response?.status === 404) {
      throw notFound();
    }
    throw error;
  }
};

export const fetchRestaurants = createServerFn({ method: "GET" })
  .validator((d: RestaurantSearchParams) => d)
  .handler(
    async ({ data: restaurantsView }): Promise<RestaurantListResponse> => {
      const mergedParams = { ...DEFAULT_PARAMS, ...restaurantsView };
      const { $limit, $offset, ...otherParams } = mergedParams; // Separate limit and offset

      //Fetch data with limit and offset applied
      const rawData = await fetchData<any[]>({
        params: { ...otherParams, $limit, $offset },
      });
      //Transform data AFTER pagination
      const transformedRestaurants = transformRestaurantData(rawData);
      return {
        restaurants: transformedRestaurants,
        totalCount: rawData.length,
      };
    }
  );

export const restaurantsQueryOptions = (params: RestaurantSearchParams) =>
  queryOptions({
    queryKey: ["restaurants"],
    queryFn: () => fetchRestaurants({ data: params }),
    select: (data) => ({
      restaurants: data.restaurants,
      totalCount: data.totalCount,
    }),
  });

export const fetchRestaurant = createServerFn({ method: "GET" })
  .validator((d: string) => d)
  .handler(async ({ data }) => {
    const res = await fetchData<any[]>({ camis: data });

    if (res.length === 0) {
      throw notFound();
    }

    const [restaurant] = transformRestaurantData(res);

    return { restaurant };
  });

export const restaurantQueryOptions = (camis: string) =>
  queryOptions({
    queryKey: ["restaurant", camis],
    queryFn: () => fetchRestaurant({ data: camis }),
  });
